import { User } from '../user/interfaces/user.interface';
import { UserService } from '../user/user.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
export declare class AuthService {
    private readonly userService;
    constructor(userService: UserService);
    createToken(payload: JwtPayload): Promise<{
        expires_in: number;
        token: string;
    }>;
    validateToken(token: string, isWs?: boolean): Promise<User | null>;
    compareHash(credentialPassword: string, userPassword: string): Promise<boolean>;
}
