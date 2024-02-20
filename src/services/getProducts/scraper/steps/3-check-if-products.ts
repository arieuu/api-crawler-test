import { Page } from "puppeteer";


async function checkIfProducts(page: Page) {

    console.log("Checking if there are products to scrape");

    try {
        const areThereProducts = await page.$eval("#main_column > div > div > h1", element => element.innerText)

        if(areThereProducts == "Erro") {
            console.log("No product found");
            console.log("Done")
            
            return { Error: "No product found" }
        }
    } catch {
        
    }

}

export default checkIfProducts;