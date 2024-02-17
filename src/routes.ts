import { Router } from "express";
import GetProductsController from "./controllers/GetProductsController";
import GetProductsDetailController from "./controllers/GetProductDetailsController";

const router = Router();

// Controller instances

const getProductsController = new GetProductsController();
const getProductsDetailController = new GetProductsDetailController();

router.get("/products", getProductsController.handle) // Route with parameters
router.get("/products/:productId", getProductsDetailController.handle) // Route with specific id


export default router;