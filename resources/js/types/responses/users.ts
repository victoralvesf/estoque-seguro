import { BaseModel, PaginatedResponse } from "./paginated"

export interface User {
    name: string
    email: string
    role: string
}

export interface UserForm extends User {
    password: string
    password_confirmation: string
}

export type UserResponse = User & BaseModel

export type UsersResponse = PaginatedResponse<UserResponse>
