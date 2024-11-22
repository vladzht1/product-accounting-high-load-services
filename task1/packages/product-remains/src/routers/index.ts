import { Router } from "express";

import { productController, shopController, shopProductController } from "@/config/components";
import { ProductCreateDto } from "@/models/dto/product-dtos";
import { ProductFilters } from "@/services/product-service";
import { ShopProductFilters } from "@/services/shop-product-service";

export const rootRouter = Router();

// Find products by filters with pagination
rootRouter.get("/api/products", async (req, res, next) => {
  try {
    const page = parseInt(String(req.query["page"]));
    const limit = parseInt(String(req.query["limit"]));

    const rawName = req.query["name"];
    const rawPlu = req.query["plu"];

    if (rawPlu && isNaN(parseInt(rawPlu.toString()))) {
      console.error("Invalid plu: " + rawPlu);
    }

    const filters = {
      ...(rawName?.toString() && { name: rawName.toString() }),
      ...(rawPlu && parseInt(rawPlu.toString()) && { plu: parseInt(rawPlu.toString()) })
    } as ProductFilters;

    return res.json(await productController.findAll(filters, { page, limit }));
  } catch (error) {
    return next(error);
  }
});

// Create product
rootRouter.post("/api/products", async (req, res, next) => {
  try {
    const { name, plu } = req.body;

    if (!name || !plu) {
      return res.status(400).json({ message: "Product name and plu must be provided" });
    }

    const productDto = new ProductCreateDto(name, plu);
    return res.json(await productController.createProduct(productDto));
  } catch (error) {
    return next(error);
  }
});

// Find all shops
rootRouter.get("/api/shops", async (_, res, next) => {
  try {
    return res.json(await shopController.findAll());
  } catch (error) {
    return next(error);
  }
});

// Create shop
rootRouter.post("/api/shops", async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name || String(name).trim().length === 0) {
      return res.status(400).json({
        ok: false,
        status: 400,
        message: "`name` must be provided"
      })
    }

    return res.json(await shopController.create(String(name)));
  } catch (error) {
    return next(error);
  }
});

// Find shop remains by filters with pagination
rootRouter.get("/api/remains", async (req, res, next) => {
  try {
    const page = parseInt(String(req.query["page"]));
    const limit = parseInt(String(req.query["limit"]));

    const rawPlu = req.query["plu"];
    const rawShopId = req.query["shop_id"];
    const rawAmountFrom = req.query["amount_from"];
    const rawAmountTo = req.query["amount_to"];

    const filters = {
      ...((rawPlu && !isNaN(parseInt(String(rawPlu)))) ? { plu: parseInt(String(rawPlu)) } : {}),
      ...((rawShopId && !isNaN(parseInt(String(rawShopId)))) ? { shopId: parseInt(String(rawShopId)) } : {}),
      ...((rawAmountFrom && !isNaN(parseInt(String(rawAmountFrom)))) ? { shopAmountFrom: parseInt(String(rawAmountFrom)) } : {}),
      ...((rawAmountTo && !isNaN(parseInt(String(rawAmountTo)))) ? { shopAmountTo: parseInt(String(rawAmountTo)) } : {})
    } as ShopProductFilters;

    if (filters.shopAmountFrom && filters.shopAmountTo && filters.shopAmountFrom > filters.shopAmountTo) {
      return res.status(400).json({
        ok: false,
        status: 400,
        message: "`amount_from` cannot be greater than `amount_to`"
      });
    }

    return res.json(await shopProductController.findAll(filters, { page, limit }));
  } catch (error) {
    return next(error);
  }
});

rootRouter.post("/api/remains", async (req, res, next) => {
  try {
    const shopId = parseInt(req.body["shopId"]);
    const productId = parseInt(req.body["productId"]);
    const amount = parseInt(req.body["amount"]);

    if (isNaN(shopId) || isNaN(productId) || isNaN(amount)) {
      return res.status(400).json({
        ok: false,
        message: "`shopId`, `productId` and `amount` must be integers"
      });
    }

    return res.json(await shopProductController.addProductToShop({
      shopId,
      productId,
      amount
    }));
  } catch (error) {
    return next(error);
  }
});

// Increase product remains for shop
rootRouter.patch("/api/remains/:id/increase", async (req, res, next) => {
  try {
    const remainId = parseInt(req.params.id);
    const increaseBy = req.body["increaseBy"];

    if (!remainId || isNaN(remainId) || !increaseBy || typeof increaseBy !== "number") {
      return res.status(400).json({
        message: "RemainId must be a valid id, `increaseBy` must be a positive whole number"
      });
    }

    return res.json(await shopProductController.increaseShopProductAmount(remainId, increaseBy));
  } catch (error) {
    return next(error);
  }
});

// Decrease product remains for shop
rootRouter.patch("/api/remains/:id/decrease", async (req, res, next) => {
  try {
    const remainId = parseInt(req.params.id);
    const decreaseBy = req.body["decreaseBy"];

    if (!remainId || isNaN(remainId) || !decreaseBy || typeof decreaseBy !== "number") {
      return res.status(400).json({
        message: "RemainId must be a valid id, `decreaseBy` must be a positive whole number"
      });
    }

    return res.json(await shopProductController.decreaseShopProductAmount(remainId, decreaseBy));
  } catch (error) {
    return next(error);
  }
});

rootRouter.all("*", (_, res) => {
  return res.status(404).json({
    ok: false,
    message: "Not found"
  });
});
