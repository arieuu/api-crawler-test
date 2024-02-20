import scrapeProductDetails from "./getProductDetailsScraper";

class GetProductDetailsService {

    async execute(productId: string) {
        const productDetails = await scrapeProductDetails(productId);

        return productDetails;
    }

}

export default GetProductDetailsService;