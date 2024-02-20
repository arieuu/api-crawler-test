import { Page } from "puppeteer";
import { IproductDetails } from "../../../types/productDetails";


async function scrapeServingSize(page: Page, productDetailsResponse: IproductDetails) {

    console.log("Scraping serving size");

    let servingSize;

    // Table data placeholders

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


    try {
        servingSize = await page.$eval("#panel_serving_size_content > div > div > div", element => element.innerText);

    } catch {
        servingSize = "unknown";
        console.log("No serving size, moving on....")
    }

    productDetailsResponse.nutrition!.servingSize = servingSize.split(":").pop().trim();


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

    productDetailsResponse.nutrition!.data = {
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


}

export default scrapeServingSize;