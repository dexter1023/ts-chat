import * as mongoose from 'mongoose';

const message = new mongoose.Schema({
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

message.pre('save', function(next) {
  this.createdAt = new Date(Date.now()).toISOString();
  next();
});

export const MessageSchema = message;
