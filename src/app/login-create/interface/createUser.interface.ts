import { AuthenticationUser } from "./authenticationUser.interface";

export interface CreateUser{
    name: string,
    email: string,
    password: string
}