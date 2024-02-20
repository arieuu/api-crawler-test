import IFilterType from "../../../../model/filter"
import { IProduct } from "../../../../model/product"


async function setNovaNutrition(products: IProduct[], { nova, nutrition }: IFilterType) {

    console.log("Setting nova and nutrition scores");

    for (const product of products) {
        
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
            product.nova!.title = "Alimentos não processados ou minimamente processados cuuuu"

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

    return products;

}

export default setNovaNutrition;