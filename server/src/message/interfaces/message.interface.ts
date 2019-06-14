import { Document } from 'mongoose';
import { User } from 'src/user/interfaces/user.interface';

export interface Message extends Document {
  readonly _id: string;
  readonly user: any;
  readonly message: string;
  readonly createdAt: string;
}
