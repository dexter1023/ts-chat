export interface CreateUserDTO {
    readonly nick: string;
    readonly email: string;
    readonly password: string;
    isAdmin: boolean;
}
