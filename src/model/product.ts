
export interface IProduct {
    id?: string,
    name?: string,
    nutrition?: Inutrition,
    nova?: Inova
}

interface Inutrition {
    score: string,
    title: string
}

interface Inova {
    score: number,
    title: string
}