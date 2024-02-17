
class GetProductsService {
    async execute() {
        const products = {
            "banana": "fresh",
            "peach": "rotten"
        }

        return products;
    }

}

export default GetProductsService;