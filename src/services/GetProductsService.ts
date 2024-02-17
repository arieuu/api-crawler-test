import { ParsedQs } from "qs";

interface IFilterType {
    nutrition: string | ParsedQs | string[] | ParsedQs[] | undefined
    nova: string | ParsedQs | string[] | ParsedQs[] | undefined
}

class GetProductsService {
    async execute({ nutrition, nova }: IFilterType) {
        const products = {
            "nutrition": nutrition,
            "nova": nova,
            "banana": "fresh",
            "peach": "rotten"
        }

        return products;
    }

}

export default GetProductsService;