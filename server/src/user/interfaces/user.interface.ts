import { Document } from 'mongoose';

export interface User extends Document {
  readonly nick: string;
  readonly email: string;
  readonly password: string;
  readonly isAdmin: boolean;
  readonly avatar: string;
}
