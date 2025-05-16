import { Category } from "../../../management/category/interface/category.interface"
import { Paginator } from "./paginator.interface"

export interface Pageable<T>{
    content: T[],
    page: Paginator

}