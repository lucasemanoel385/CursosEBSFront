import { Profile } from "./profile.interface";

export interface User{
    id: number,
    name: string,
    email: string,
    password: string,
    role: Profile,
    createdAt: Date
}