import { BaseModel, PaginatedResponse } from "./paginated"

export interface Product {
    name: string
    description: string
    quantity: number
    price: string
    currency_code: string
    category: string
    sku: string
}

export type ProductResponse = Product & BaseModel

export type ProductsResponse = PaginatedResponse<ProductResponse>
