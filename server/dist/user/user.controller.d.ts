import { CreateUserDTO } from './dto/create-user.dto';
import { UserService } from './user.service';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    updateUser(req: any, res: any, body: CreateUserDTO): Promise<void>;
    deleteUser(req: any, res: any): Promise<void>;
}
