import { Page } from "puppeteer";
import { Iingredients, IproductDetails } from "../../../types/productDetails";


async function scrapeProductGeneralDetails(page: Page, productDetailsResponse: IproductDetails) {

    console.log("Scraping general details of product");

    // Setting the variables

    let hasOil;
    let isVegan;
    let isVegetarian; 
    let ingredientList: string[];

    
    try {
        productDetailsResponse.title = await page.$eval("#product > div > div > div.card-section > div > div.medium-8.small-12.columns > h2", element => element.innerText)

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

    // Palm oil

    if (hasOil == "Sem óleo de palma") {
        ingredients.hasPalmOil = "false"

    } else if(hasOil == "Óleo de palma") {
        ingredients.hasPalmOil = "true"

    } else {
        ingredients.hasPalmOil = "unknown"
    }

    // Vegan

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

    // Setting the scraped data to return object

    productDetailsResponse.ingredients = ingredients


}

export default scrapeProductGeneralDetails;