import { Page } from "puppeteer";
import { IproductDetails } from "../../../../model/productDetails";



async function scrapeNovaScore(page: Page, productDetailsResponse: IproductDetails) {

    console.log("Scraping nova score");

    let novaScore;
    let novaTitle;

    try {
        novaScore = await page.$eval("#attributes_grid > li:nth-child(2) > a > div > div > div.attr_text > h4", element => element.innerText);

    } catch {
        console.log("No Nova score was found, moving on...")
    }

    // Nova title

    try {
        novaTitle = await page.$eval("#attributes_grid > li:nth-child(2) > a > div > div > div.attr_text > span", element => element.innerText);
        if(novaTitle.includes("Nível desconhecido")) novaTitle = "unknown";

    } catch {
        console.log("No Nova title was found, moving on...")
    }

    productDetailsResponse.nova = {
        "score": parseInt(novaScore.split(" ").pop()),
        "title": novaTitle
    }

}

export default scrapeNovaScore;