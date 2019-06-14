import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDTO } from './dto/create-user.dto';
export declare class UserService {
    private readonly UserModel;
    constructor(UserModel: Model<User>);
    getAllUsers(): Promise<User[]>;
    getUserById(id: string): Promise<User>;
    getUserByEmail(email: string): Promise<User>;
    saveUser(body: CreateUserDTO, isAdmin?: boolean): Promise<User>;
    updateUser(id: string, body: CreateUserDTO): Promise<User>;
    deleteUser(id: string): Promise<any>;
}
