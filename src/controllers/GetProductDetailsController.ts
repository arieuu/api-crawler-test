import { Request, Response } from "express";
import GetProductDetailsService from "../services/getProductDetails/GetProductDetailsService";


class GetProductsDetailController {
    async handle(request: Request, response: Response) {
        const productId = request.params.productId
        const getProductDetailsService = new GetProductDetailsService();

        const product = await getProductDetailsService.execute(productId);

        if(product instanceof Error) {
            response.status(404);
            response.json(product.message);

        } 

        response.status(200);
        return response.json(product);
    }

}

export default GetProductsDetailController;