import puppeteer, { Browser } from "puppeteer";
import { IproductDetails, Iingredients } from "../../types/productDetails";

// 7898678660014 look into this

async function scrapeProductDetails(productId: string) {
    console.log("Opening browser and going to product")

    // STEP 1: Start a browser instance and create a new page

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("https://br.openfoodfacts.org/produto/" + productId);

    console.log("Getting specific data from the page");


    // Placeholder variables and objects

    let productDetailsResponse:IproductDetails = {}
    let hasOil;
    let isVegan;
    let isVegetarian;
    let ingredientList: string[];
    let nutriScore;


    // STEP 2: Scraping specific data for this product and save it to response object

    try {
        productDetailsResponse.title = await page.$eval("#field_generic_name_value > span", element => element.innerText)

    } catch {
        productDetailsResponse.title = "";
        console.log("Title not found, moving on...");
    }

    try {
        productDetailsResponse.quantity = await page.$eval("#field_quantity_value", element => element.innerText)

    } catch {
        productDetailsResponse.quantity = "";
        console.log("Quantity not found, moving on...");
    }

    try {
        hasOil = await page.$eval("ul[id^=panel_ingredients_analysis_en] > li > a > h4", element => element.innerText)
        isVegan = await page.$eval("ul[id*=vegan] > li > a > h4", element => element.innerText);
        isVegetarian = await page.$eval("ul[id*=vegetarian] > li > a > h4", element => element.innerText);

    } catch {
        console.log("Ingredient analysis not found, moving on...")
    }

    try {
        ingredientList = await page.$$eval("#panel_ingredients_content > div", elements => elements.map(element => {
            return element.querySelector(".panel_text").innerText
        }))

    } catch {
        ingredientList = [];
        console.log("Ingredient list not found, moving on...")
    }

    let ingredients: Iingredients = {};

    // Setting actual values for ingredient analysis

    // palm oil

    console.log(hasOil)
    if (hasOil == "Sem óleo de palma") {
        ingredients.hasPalmOil = "false"

    } else if(hasOil == "Óleo de palma") {
        ingredients.hasPalmOil = "true"

    } else {
        ingredients.hasPalmOil = "unknown"
    }

    // is vegan

    if (isVegan == "Vegano") {
        ingredients.isVegan = "true"

    } else if(isVegan == "Não vegano") {
        ingredients.isVegan = "false";

    } else {
        ingredients.isVegan = "unknown"
    }

    // is vegetarian

    if (isVegetarian == "Vegetariano") {
        ingredients.isVegetarian = "true"

    } else if(isVegetarian == "Não vegetariano") {
        ingredients.isVegetarian = "false";

    } else {
        ingredients.isVegetarian = "unknown"
    }

    // Ingredient list

    ingredients.list = ingredientList;

    productDetailsResponse.ingredients = ingredients

    // Getting nutriscore

    try {
        nutriScore = await page.$eval("#attributes_grid > li:nth-child(1) > a > div > div > div.attr_text > h4", element => element.innerText);

    } catch {
        console.log("No nutriscore, moving on....")
    }

    console.log(nutriScore)

    console.log(productDetailsResponse)

    console.log("Done")

    browser.close();

    return productDetailsResponse;
}

export default scrapeProductDetails;