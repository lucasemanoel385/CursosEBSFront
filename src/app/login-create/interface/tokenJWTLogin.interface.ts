import { AuthenticationUser } from "./authenticationUser.interface";

export interface TokenJWTLogin{
    tokenJWT: string,
    authorities: AuthenticationUser[],
    name: string,
    id: number
}