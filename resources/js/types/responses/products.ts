import { PaginatedResponse } from "./paginated"

export interface Product {
    id: number
    name: string
    description: string
    quantity: number
    price: number
    currency_code: string
    category: string
    sku: string
    created_at: string
    updated_at: string
}

export type ProductsResponse = PaginatedResponse<Product>
