import { Request, Response } from "express";
import GetProductsService from "../services/getProducts/GetProductsService";

class GetProductsController {
    async handle(request: Request, response: Response) {
        const nutrition = request.query.nutrition;
        const nova = request.query.nova;
        const getProductsService = new GetProductsService();

        if(!nutrition || !nova) {
            response.status(400)
            return response.json({ Error: "No filters provided"})
        }

        const products = await getProductsService.execute({ nutrition, nova });

        response.status(200)
        return response.json(products)
    }
}

export default GetProductsController;