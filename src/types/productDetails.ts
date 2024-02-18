// Here we define the entire shape of the object we will be returning

export interface IproductDetails {
    "title"?: string,
    "quantity"?: string,
    "ingredients"?: Iingredients,
    "nutrition"?: INutrition,
}

export interface Iingredients {
    "hasPalmOil"?: string,
    "isVegan"?: string,
    "isVegetarian"?: string,
    "list"?: string[]
}

export interface INutrition {
    "score"?: string,
    "values"?: string[][],
    "servingSize"?: string,
    "data"?: ItableData,
}

export interface ItableData {
    "Energia": {
        "per100g": string,
        "perServing": string
    },

    "Gorduras/lípidos": {
        "per100g": string,
        "perServing": string
    },

    "Carboidratos": {
        "per100g": string,
        "perServing": string
    },

    "Fibra alimentar": {
        "per100g": string,
        "perServing": string
    },

    "Proteínas": {
        "per100g": string,
        "perServing": string
    },

    "Sal": {
        "per100g": string,
        "perServing": string
    }




}

