import { Router } from "express";
import GetProductsController from "../controllers/GetProductsController";
import GetProductsDetailController from "../controllers/GetProductDetailsController";

const router = Router();




const getProductsController = new GetProductsController();
const getProductsDetailController = new GetProductsDetailController();

router.get("/products", getProductsController.handle) // Route with parameters
router.get("/products/:productId", getProductsDetailController.handle) // Route with specific id

/**
 * @swagger
 * tags:
 *   - name: Products  
 *     descritpion: Interact with products 
 */


// Models

// Product summarized

/**
 * @swagger
 * components:
 *   schemas:
 *     ProductSmall:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Product id
 *         name:
 *           type: string
 *           description: Product name
 *         nutrition:
 *           type: object
 *           description: Detailed product nutrition value
 *         nova:
 *           type: object
 *           description: Detailed nova score for product

 *       example:
 *         id: 7898276600108
 *         name: Feijão Caldo Nobre - Feijão Tradicional
 *         nutrition: {
 *              score: A,
 *              title: Qualidade nutricional muito boa
 *         }
 *         nova: {
 *              score: 1,
 *              title: Ingredientes culinários processados
 *         }
 */


// Product

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: Product name
 * 
 *         quantity:
 *           type: string
 *           description: Product quantity
 * 
 *         ingredients:
 *           type: object
 *           description: Ingredients the product contains
 * 
 *         nutrition:
 *           type: object
 *           description: Product nutrition facts
 * 
 *         nova: 
 *           type: object
 *           description: Information on products nova score
 *  

 *       example:
 *         title: "Futuro burger"
 *         quantity: "230 g"
 *         ingredients: {}
 *         nutrition: {}
 *         nova: {}
 * 
 */




// ROUTES

// all products

/**
 * @swagger
 * /products:
 *   get:
 *     tags:
 *        - Products     
 *     parameters: 
 *      - in: query
 *        name: nutrition
 *        schema:
 *          type: string
 *        description: Filter products by nutrition value
 *        required: true  
 * 
 *      - in: query
 *        name: nova
 *        schema:
 *          type: integer
 *        description: Filter products by nova score
 *        required: true
 *       
 *     summary: Get list of products and their properties
 *     responses:
 *       200:
 *         description: Returns a list of filtered products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array   
 *               items:   
 *                 $ref: '#/components/schemas/ProductSmall'
 *       500:
 *         description: Internal server error
 *
 */

// Products by id

/**
 * @swagger
 * /products/{productId}:
 *   get:
 *     tags:
 *        - Products
 *     parameters: 
 *      - in: path
 *        name: productId
 *        schema:
 *          type: string
 *        description: Id of the product you wish to scrape
 *        required: true  
 * 
 *     summary: Get all the data for specific product
 *     responses:
 *       200:
 *         description: Returns a list of filtered products.
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Product'
 *       500:
 *         description: Internal server error
 *
 */
export default router;