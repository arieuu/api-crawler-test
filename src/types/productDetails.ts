
interface IproductDetails {
    "title"?: string,
    "quantity"?: string,

    "ingredients"?: {
        "hasPalmOil": string,
        "isVegan": boolean,
        "isVegetarian": boolean,
        "list": string[]
    }
}

export default IproductDetails;