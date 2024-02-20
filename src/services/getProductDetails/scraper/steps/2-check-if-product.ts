import { Page } from "puppeteer";


async function checkIfProduct(page: Page) {

    console.log("Checking if product exists");


    try {

        // Check the page and look for any error message

        const doesProductExist = await page.$eval("#main_column > div > div > h1", element => element.innerText)

        if(doesProductExist == "Erro") {
            console.log("Product doens't exist");
            return { Error: "Product doesn't exist" }
        }

    } catch {

    }

}

export default checkIfProduct;