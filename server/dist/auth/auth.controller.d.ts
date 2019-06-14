import { AuthService } from './auth.service';
import { AuthPayload } from './interfaces/auth-payload.interface';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/interfaces/user.interface';
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UserService);
    createToken(body: AuthPayload, res: any): Promise<any>;
    register(body: User, res: any): Promise<any>;
}
