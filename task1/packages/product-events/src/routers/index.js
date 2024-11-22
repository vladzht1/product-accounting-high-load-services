import { Router } from "express";

import { productEventController } from "../config/components.js";

export const rootRouter = Router();

rootRouter.get("/api/product_events", async (req, res) => {
  const page = parseInt(String(req.query["page"]));
  const limit = parseInt(String(req.query["limit"]));

  const rawShopId = req.query["shop_id"];
  const rawPlu = req.query["plu"];
  const rawAction = req.query["action"];
  const rawDateFrom = req.query["date_from"];
  const rawDateTo = req.query["date_to"];

  const dateFrom = new Date(String(rawDateFrom));
  const dateTo = new Date(String(rawDateTo));

  const filters = {
    ...(rawShopId && !isNaN(parseInt(String(rawShopId))) ? { shopId: parseInt(String(rawShopId)) } : {}),
    ...(rawPlu && !isNaN(parseInt(String(rawPlu))) ? { plu: parseInt(String(rawPlu)) } : {}),
    ...(rawAction ? { action: String(rawAction) } : {}),
    ...(rawDateFrom && dateFrom ? { dateFrom } : {}),
    ...(rawDateTo && dateTo ? { dateTo } : {}),
  };

  console.log({ filters });

  return res.json(await productEventController.findAll(filters, { page, limit }));
});

rootRouter.all("*", (_, res) => {
  return res.status(404).json({
    ok: false,
    status: 404,
    message: "Not Found",
  });
});
