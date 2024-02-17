import scrapeProductDetails from "./scrapeProductDetails";

class GetProductDetailsService {

    async execute(productId: string) {
        const product = {
            "id": productId,
            "name": "potato",
            "status": "meh"
        }

        const productDetails = await scrapeProductDetails(productId);

        return product;
    }

}

export default GetProductDetailsService;