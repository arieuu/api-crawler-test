import puppeteer from "puppeteer";
import { IproductDetails } from "../../../model/productDetails";
import checkIfProduct from "./steps/2-check-if-product";
import scrapeProductGeneralDetails from "./steps/3-scrape-product-general-details";
import scrapeNutritionScore from "./steps/4-scrape-nutrition-score";
import scrapeServingSize from "./steps/5-scrape-serving-size";
import scrapeNovaScore from "./steps/6-scrape-nova-score";


async function scrapeProductDetails(productId: string) {

    console.log("Loading product page");

    // STEP 1: Start a browser instance and create a new page

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("https://br.openfoodfacts.org/produto/" + productId);

    console.log("Getting specific data from the page");


    let productDetailsResponse:IproductDetails = {}     // Setting the placeholder shape of our response
    

    // STEP 2: Check if the products exist

    if(await checkIfProduct(page)) return new Error("Product not found");


    // STEP 3: Scraping product general detail

    await scrapeProductGeneralDetails(page, productDetailsResponse);

    
    // STEP 4: Scraping nutrition score

    await scrapeNutritionScore(page, productDetailsResponse);


    // STEP 5: Scraping serving size

    await scrapeServingSize(page, productDetailsResponse);


    // STEP 6: Scraping nova score

    await scrapeNovaScore(page, productDetailsResponse);

    
    // Done scraping

    console.log("Done")

    browser.close();

    return productDetailsResponse;
}

export default scrapeProductDetails;