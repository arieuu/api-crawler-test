import { Router } from "express";
import GetProductsController from "../controllers/GetProductsController";
import GetProductsDetailController from "../controllers/GetProductDetailsController";

const router = Router();




const getProductsController = new GetProductsController();
const getProductsDetailController = new GetProductsDetailController();

router.get("/products", getProductsController.handle) // Route with parameters
router.get("/products/:productId", getProductsDetailController.handle) // Route with specific id



// Models

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *       properties:
 *         id:
 *           type: string
 *           description: Product id
 *         title:
 *           type: string
 *           description: The title of your book
 *         author:
 *           type: string
 *           description: The book author
 *         finished:
 *           type: boolean
 *           description: Whether you have finished reading the book
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the book was added
 *       example:
 *         id: d5fE_asz
 *         title: The New Turing Omnibus
 *         author: Alexander K. Dewdney
 *         finished: false
 *         createdAt: 2020-03-10T04:05:06.157Z
 */

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Get list of products
 * /products:
 *   get:
 *     summary: Get list of products and their properties
 *     responses:
 *       200:
 *         description: The created book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 *       500:
 *         description: Some server error
 *
 */

export default router;