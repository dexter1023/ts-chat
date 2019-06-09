import * as mongoose from 'mongoose';

export const MessageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  message: {
    type: String,
    require: true,
  },
  createdAt: Date,
});
