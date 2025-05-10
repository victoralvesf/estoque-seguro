import { BaseModel, PaginatedResponse } from "./paginated"

export interface Product extends BaseModel {
    name: string
    description: string
    quantity: number
    price: number
    currency_code: string
    category: string
    sku: string
}

export type ProductsResponse = PaginatedResponse<Product>
