import puppeteer from "puppeteer";
import IFilterType from "../../../model/filter";
import checkIfProducts from "./steps/3-check-if-products";
import scrapeAllProducts from "./steps/4-scraping-all-products";
import setNovaNutrition from "./steps/5-setting-nova-and-nutrition";



async function scrapeProducts({ nova, nutrition }: IFilterType) {

    console.log("Opening a headless browser");


    // STEP 1: Start a browser instance and create a new page

    const browser = await puppeteer.launch();
    const page = await browser.newPage();


    // STEP 2: Changing to products page with filters applied

    console.log("Loading products page with filters applied");

    await page.goto("https://br.openfoodfacts.org/nutrition-grade/" + nutrition + "/nova-group/" + nova);


    // STEP 3: Checking if there are any products to scrape in the page

    if ( await checkIfProducts(page)) return new Error("No products found");


    // STEP 4:  Scraping all products

    const products = await scrapeAllProducts(page);


    // STEP 5: Setting nova score and nutrition scores to final return object

    await setNovaNutrition(products, { nova, nutrition });

    console.log("Done");

    browser.close();

    return products;


}

export default scrapeProducts;