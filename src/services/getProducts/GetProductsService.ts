import IFilterType from "../../types/filter";
import scrapeProducts from "./scrapeProducts";


class GetProductsService {
    async execute({ nutrition, nova }: IFilterType) {
        const r = {
            "nutrition": nutrition,
            "nova": nova,
            "banana": "fresh",
            "peach": "rotten"
        }

        const products = await scrapeProducts({ nutrition, nova })
        return products;
    }

}

export default GetProductsService;