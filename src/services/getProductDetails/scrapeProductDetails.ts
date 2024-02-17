import puppeteer, { Browser } from "puppeteer";

async function scrapeProductDetails(productId: string) {
    console.log("Opening browser and going to product")

    // Step 1: First we start a browser instance and create a new page

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto("https://br.openfoodfacts.org/produto/" + productId);

    console.log("Taking page screenshot")

    await page.screenshot({ type: 'jpeg', path: './screenshot.jpeg', fullPage: true });

    console.log("Done")

    browser.close();

    return page;
}

export default scrapeProductDetails;