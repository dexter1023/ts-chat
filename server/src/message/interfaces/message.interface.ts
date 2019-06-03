import { Document } from 'mongoose';

export interface Message extends Document {
  readonly userId: string,
  readonly message: string,
  readonly createdAt: string,
}
