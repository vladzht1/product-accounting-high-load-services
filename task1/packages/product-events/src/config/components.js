import { ProductEventController } from "../controllers/product-event-controller.js";
import { ProductEventRepository } from "../repositories/product-event-repository.js";
import { ProductEventService } from "../services/product-event-service.js";

const productEventRepository = new ProductEventRepository();

export const productEventService = new ProductEventService(productEventRepository);

export const productEventController = new ProductEventController(productEventService);
