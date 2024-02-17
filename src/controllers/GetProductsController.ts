import { Request, Response } from "express";
import GetProductsService from "../services/GetProductsService";

class GetProductsController {
    async handle(request: Request, response: Response) {
        const nutrition = request.query.nutrition;
        const nova = request.query.nova;
        const getProductsService = new GetProductsService();

        const products = await getProductsService.execute({ nutrition, nova });

        response.json(products)
    }
}

export default GetProductsController;