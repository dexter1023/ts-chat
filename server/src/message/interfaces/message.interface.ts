import { Document } from 'mongoose';

export interface Message extends Document {
  readonly _id: string;
  readonly userId: string;
  readonly message: string;
  readonly createdAt: string;
}
