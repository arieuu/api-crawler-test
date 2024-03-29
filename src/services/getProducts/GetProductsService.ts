import IFilterType from "../../model/filter";
import scrapeProducts from "./scraper/getProductsScraper";


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