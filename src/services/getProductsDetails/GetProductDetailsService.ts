


class GetProductDetailsService {

    async execute(productId: string) {
        const product = {
            "id": productId,
            "name": "potato",
            "status": "meh"
        }

        return product;
    }

}

export default GetProductDetailsService;