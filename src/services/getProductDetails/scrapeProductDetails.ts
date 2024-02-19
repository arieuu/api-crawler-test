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
    let nutritionValuesList: string[];
    let nutritionValuesArray = [];
    let servingSize;

    // Table data placeholder

    let energiaPer100g;
    let energiaPerServing;
    let gorduraPer100g;
    let gorduraPerServing;
    let carboidratosPer100g;
    let carboidratosPerServing;
    let fibraPer100g;
    let fibraPerServing;
    let proteinasPer100g;
    let proteinaPerServing;
    let salPer100g;
    let salPerServing;

    // Nova

    let novaScore;
    let novaTitle;

    try {
        const doesProductExist = await page.$eval("#main_column > div > div > h1", element => element.innerText)

        if(doesProductExist == "Erro") {
            console.log("Product doens't exist");
            console.log("Done")
            return { Error: "Product doesn't exist" }
        }
    } catch {
    }


    // STEP 2: Scraping specific data for this product and save it to response object

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

    // Getting list of nutrients

    try {
        nutritionValuesList = await page.$$eval("#panel_nutrient_levels_content > div > ul", elements => elements.map(element => {
            return element.querySelector(".evaluation__title").innerText
        }))

    } catch {
        nutritionValuesList = []
        console.log("no nutrition val")
    }

    for (const nutritionValue of nutritionValuesList) {
        let arr = []

        if(nutritionValue.includes("quantidade baixa")) {
            arr.push("low");

        } else if (nutritionValue.includes("quantidade moderada")) {
            arr.push("moderate");

        } else if(nutritionValue.includes("quantidade elevada")) {
            arr.push("high");
        }

        arr.push(nutritionValue)

        nutritionValuesArray.push(arr)
    }

    productDetailsResponse.nutrition = {
        "score": nutriScore.split(" ").pop(), // Getting just the letter of the score
        "values": nutritionValuesArray
    }


    // Getting serving size

    try {
        servingSize = await page.$eval("#panel_serving_size_content > div > div > div", element => element.innerText);

    } catch {
        servingSize = "unknown";
        console.log("No serving size, moving on....")
    }

    productDetailsResponse.nutrition.servingSize = servingSize.split(":").pop().trim();


    // Getting all the table data

    try {
        energiaPer100g = await page.$eval("#panel_nutrition_facts_table_content > div > table > tbody > tr:nth-child(1) > td:nth-child(2) > span", element => element.innerText);
        energiaPerServing = await page.$eval("#panel_nutrition_facts_table_content > div > table > tbody > tr:nth-child(1) > td:nth-child(3) > span", element => element.innerText);
        gorduraPer100g = await page.$eval("#panel_nutrition_facts_table_content > div > table > tbody > tr:nth-child(2) > td:nth-child(2) > span", element => element.innerText);
        gorduraPerServing = await page.$eval("#panel_nutrition_facts_table_content > div > table > tbody > tr:nth-child(2) > td:nth-child(3) > span", element => element.innerText);
        carboidratosPer100g = await page.$eval("#panel_nutrition_facts_table_content > div > table > tbody > tr:nth-child(4) > td:nth-child(2) > span", element => element.innerText);
        carboidratosPerServing = await page.$eval("#panel_nutrition_facts_table_content > div > table > tbody > tr:nth-child(4) > td:nth-child(3) > span", element => element.innerText);
        fibraPer100g = await page.$eval("#panel_nutrition_facts_table_content > div > table > tbody > tr:nth-child(6) > td:nth-child(2) > span", element => element.innerText);
        fibraPerServing = await page.$eval("#panel_nutrition_facts_table_content > div > table > tbody > tr:nth-child(6) > td:nth-child(3) > span", element => element.innerText);
        proteinasPer100g = await page.$eval("#panel_nutrition_facts_table_content > div > table > tbody > tr:nth-child(7) > td:nth-child(2) > span", element => element.innerText);
        proteinaPerServing = await page.$eval("#panel_nutrition_facts_table_content > div > table > tbody > tr:nth-child(7) > td:nth-child(3) > span", element => element.innerText);
        salPer100g = await page.$eval("#panel_nutrition_facts_table_content > div > table > tbody > tr:nth-child(8) > td:nth-child(2) > span", element => element.innerText);
        salPerServing = await page.$eval("#panel_nutrition_facts_table_content > div > table > tbody > tr:nth-child(8) > td:nth-child(3) > span", element => element.innerText);

    } catch {
        console.log("No nutrition table details, moving on...")
    }

    // Setting table data into the object that will be returned

    productDetailsResponse.nutrition.data = {
        "Energia": {
            "per100g": energiaPer100g.replace(/\r?\n/g, " "),
            "perServing": energiaPerServing.replace(/\r?\n/g, " ")
        },

        "Gorduras/lípidos": {
            "per100g": gorduraPer100g,
            "perServing": gorduraPerServing
        },

        "Carboidratos": {
            "per100g": carboidratosPer100g,
            "perServing": carboidratosPerServing
        },

        "Fibra alimentar": {
            "per100g": fibraPer100g,
            "perServing": fibraPerServing
        },

        "Proteínas": {
            "per100g": proteinasPer100g,
            "perServing": proteinaPerServing
        },

        "Sal": {
            "per100g": salPer100g,
            "perServing": salPerServing
        }
    }


    // Getting nova score

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
    console.log(productDetailsResponse)

    console.log("Done")
    console.log(energiaPerServing)

    browser.close();

    return productDetailsResponse;
}

export default scrapeProductDetails;