import { UserService } from '../../user/user.service';
import { AuthPayload } from '../interfaces/auth-payload.interface';
declare const JwtService_base: new (...args: any[]) => any;
export declare class JwtService extends JwtService_base {
    private readonly userService;
    constructor(userService: UserService);
    validate(req: any, payload: AuthPayload, done: any): Promise<any>;
}
export {};
