import puppeteer, { Browser } from "puppeteer";
import IproductDetails from "../../types/productDetails";



async function scrapeProductDetails(productId: string) {
    console.log("Opening browser and going to product")

    // Step 1: First we start a browser instance and create a new page

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("https://br.openfoodfacts.org/produto/" + productId);

    console.log("Getting specific data from the page");


    // Step 2: Scraping specific data for this product and save it to response object

    let productDetails:IproductDetails = {};

    productDetails.title = await page.$eval("#field_generic_name_value > span", element => element.innerText)
    productDetails.quantity = await page.$eval("#field_quantity_value", element => element.innerText)

    console.log(productDetails)

    console.log("Done")

    browser.close();

    return productDetails;
}

export default scrapeProductDetails;