import puppeteer from "puppeteer";
import IFilterType from "../../types/filter";
import { IProduct } from "../../types/product";



async function scrapeProducts({ nova, nutrition }: IFilterType) {
    console.log("Opening a headless browser")

    // STEP 1: Start a browser instance and create a new page

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // STEP 2: Creating variables for the values we will be storing
    
    let productsLinkArray: IProduct[] = [];

    console.log("Applying filters to products")

    // Accessing filtered products page

    await page.goto("https://br.openfoodfacts.org/nutrition-grade/" + nutrition + "/nova-group/" + nova);


    try {
        const areThereProducts = await page.$eval("#main_column > div > div > h1", element => element.innerText)

        if(areThereProducts == "Erro") {
            console.log("No product found");
            console.log("Done")
            
            return { Error: "No product found" }
        }
    } catch {
    }



    // Scraping all products

    try {
        productsLinkArray = await page.$$eval("#products_all > ul > li", elements => elements.map(element => {

            const id = element.querySelector("a").href.split("/")
            const name = element.querySelector(".list_product_name").innerText

            const nutritionScore = {
                score: "",
                title: ""
            }

            const novaScore = {
                score: 0,
                title: ""
            }

            return {
               id: id[id.length - 2],
               name: name,
               nutrition: nutritionScore,
               nova: novaScore
                
            }
        }))

    } catch(error) {
        productsLinkArray = []
        console.log(error)
    }

    // Setting nutrition and nova scores

    for (const product of productsLinkArray) {
        
        // Nutrition

        product.nutrition!.score = nutrition!.toString()

        if(nutrition!.toString().toUpperCase() == "A") {
            product.nutrition!.title = "Qualidade nutricional muito boa"

        } else if(nutrition!.toString().toUpperCase() == "B") {
            product.nutrition!.title = "Qualidade nutricional muito boa"

        } else if(nutrition!.toString().toUpperCase() == "C") {
            product.nutrition!.title = "Qualidade nutricional média"

        } else if(nutrition!.toString().toUpperCase() == "D") {
            product.nutrition!.title = "Qualidade nutricional baixa"

        } else if(nutrition!.toString().toUpperCase() == "E") {
            product.nutrition!.title = "Qualidade nutricional muito baixa"

        } else {
            product.nutrition!.title = "unknown"
        }

        // Nova 

        product.nova!.score = parseInt(nova!.toString());

        if(nova!.toString().toUpperCase() == "1") {
            product.nova!.title = "Alimentos não processados ou minimamente processados"

        } else if(nova!.toString().toUpperCase() == "2") {
            product.nova!.title = "Ingredientes culinários processados"

        } else if(nova!.toString().toUpperCase() == "3") {
            product.nova!.title = "Alimentos processados"

        } else if(nova!.toString().toUpperCase() == "4") {
            product.nova!.title = "Produtos alimentares e bebidas ultra-processados"

        } else {
            product.nutrition!.title = "unknown"
        }



        
    }

    console.log(productsLinkArray)


    console.log("done")

    return productsLinkArray;

    browser.close();

}

export default scrapeProducts;