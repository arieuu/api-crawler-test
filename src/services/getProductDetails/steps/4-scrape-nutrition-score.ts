import { Page } from "puppeteer";
import { IproductDetails } from "../../../types/productDetails";



async function scrapeNutritionScore(page: Page, productDetailsResponse: IproductDetails) {
    
    console.log("Scraping nutrition score");

    let nutriScore;
    let nutritionValuesList: string[];
    let nutritionValuesArray = [];

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

    // Setting scraped values to the returned object

    productDetailsResponse.nutrition = {
        "score": nutriScore.split(" ").pop(), // Getting just the letter of the score
        "values": nutritionValuesArray
    }


}

export default scrapeNutritionScore;