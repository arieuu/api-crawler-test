
export interface IproductDetails {
    "title"?: string,
    "quantity"?: string,
    "ingredients"?: Iingredients,
}

export interface Iingredients {
    "hasPalmOil"?: boolean,
    "isVegan"?: boolean,
    "isVegetarian"?: boolean,
    "list"?: string[]
}
