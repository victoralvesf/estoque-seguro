import { BaseModel, PaginatedResponse } from "./paginated"

interface Category {
    name: string
    slug: string
}

type CategoryResponse = Category & BaseModel

export interface Product {
    name: string
    description: string
    quantity: number
    price: string
    currency_code: string
    sku: string
}

export interface ProductForm extends Product {
    category: string
}

export type ProductResponse = Product & BaseModel & {
    category: CategoryResponse
    category_id: number
}

export type ProductsResponse = PaginatedResponse<ProductResponse>
