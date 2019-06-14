import { Document } from 'mongoose';
export interface Message extends Document {
    readonly _id: string;
    readonly user: any;
    readonly message: string;
    readonly createdAt: string;
}
