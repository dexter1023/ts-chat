import * as mongoose from 'mongoose';

export const MessageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  message: {
    type: String,
    require: true,
  },
  createdAt: Date,
});

MessageSchema.pre('save', function(next) {
  let message = this;
  message.createAt = new Date(Date.now()).toISOString();
  next();
});