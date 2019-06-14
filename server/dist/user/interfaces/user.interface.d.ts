import { Document } from 'mongoose';
export interface User extends Document {
    readonly _id: string;
    readonly nick: string;
    readonly email: string;
    readonly password: string;
    readonly isAdmin: boolean;
    readonly avatar: string;
}
