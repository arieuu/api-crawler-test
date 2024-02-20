import { Page } from "puppeteer"
import { IProduct } from "../../../../model/product";


async function scrapeAllProducts(page: Page) {

    console.log("Scraping products");

    let productsLinkArray: IProduct[] = [];

    // Scraping all products

    try {
        productsLinkArray = await page.$$eval("#products_all > ul > li", elements => elements.map(element => {

            const id = element.querySelector("a").href.split("/")
            const name = element.querySelector(".list_product_name").innerText

            const nutritionScore = {
                score: "",
                title: ""
            }

            const novaScore = {
                score: 0,
                title: ""
            }

            return {
               id: id[id.length - 2],
               name: name,
               nutrition: nutritionScore,
               nova: novaScore
                
            }
        }));

        return productsLinkArray;

    } catch(error) {
        productsLinkArray = []
        console.log(error)
        return productsLinkArray;

    }
}

export default scrapeAllProducts;