import puppeteer, { Browser } from "puppeteer";
import { IproductDetails, Iingredients } from "../../types/productDetails";

// 7898678660014 look into this

async function scrapeProductDetails(productId: string) {
    console.log("Opening browser and going to product")

    // STEP 1: First we start a browser instance and create a new page

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("https://br.openfoodfacts.org/produto/" + productId);

    console.log("Getting specific data from the page");


    // STEP 2: Scraping specific data for this product and save it to response object

    // Placeholder response object 

    let productDetails:IproductDetails = {};

    productDetails.title = await page.$eval("#field_generic_name_value > span", element => element.innerText)
    productDetails.quantity = await page.$eval("#field_quantity_value", element => element.innerText)

    const hasOil = await page.$eval("#panel_ingredients_analysis_en-palm-oil-free > li > a > h4", element => element.innerText)
    const isVegan = await page.$eval("#panel_ingredients_analysis_en-vegan > li > a > h4", element => element.innerText);
    const isVegetarian = await page.$eval("#panel_ingredients_analysis_en-vegetarian > li > a > h4", element => element.innerText);

    const ingredientList = await page.$$eval("#panel_ingredients_content > div", elements => elements.map(element => {
        return element.querySelector(".panel_text").innerText
    }))

    let ingredients: Iingredients = {};

    // Setting actual values 

    ingredients.hasPalmOil = hasOil == "Sem óleo de palma" ? false : true;
    ingredients.isVegan = isVegan == "Vegano" ? true : false;
    ingredients.isVegetarian = isVegetarian == "Vegetariano" ? true : false;
    ingredients.list = ingredientList;

    productDetails.ingredients = ingredients

    console.log(productDetails)

    console.log("Done")

    browser.close();

    return productDetails;
}

export default scrapeProductDetails;