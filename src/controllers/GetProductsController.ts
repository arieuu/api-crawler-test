import { Request, Response } from "express";
import GetProductsService from "../services/GetProductsService";

class GetProductsController {
    async handle(request: Request, response: Response) {
        const getProductsService = new GetProductsService();

        const products = await getProductsService.execute();

        response.json(products)
    }
}

export default GetProductsController;