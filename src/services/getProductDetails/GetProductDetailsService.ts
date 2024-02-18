import scrapeProductDetails from "./scrapeProductDetails";

class GetProductDetailsService {

    async execute(productId: string) {
        const productDetails = await scrapeProductDetails(productId);

        return productDetails;
    }

}

export default GetProductDetailsService;