import { Request, Response } from "express";
import GetProductDetailsService from "../services/getProductsDetails/GetProductDetailsService";
import accessProduct from "../services/getProductsDetails/steps/accessProduct";


class GetProductsDetailController {
    async handle(request: Request, response: Response) {
        const productId = request.params.productId
        const getProductDetailsService = new GetProductDetailsService();

        const product = await getProductDetailsService.execute(productId);

        const productDetails = await accessProduct(productId);

        response.json(product)
    }

}

export default GetProductsDetailController;