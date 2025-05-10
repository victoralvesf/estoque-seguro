import { BaseModel, PaginatedResponse } from "./paginated"

export interface User extends BaseModel {
    name: string
    email: string
    role: string
}

export type UsersResponse = PaginatedResponse<User>
