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
}


