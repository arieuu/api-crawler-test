import { ParsedQs } from "qs";

export default interface IFilterType {
    nutrition: string | ParsedQs | string[] | ParsedQs[] | undefined
    nova: string | ParsedQs | string[] | ParsedQs[] | undefined
}