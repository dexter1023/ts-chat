import { Document } from 'mongoose';

export interface Chat extends Document {
  readonly name: string,
  readonly users: string[];
  readonly messages: string[];
  readonly moderators: string[];
  readonly isPrivate: boolean;
}
