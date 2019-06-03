import * as mongoose from 'mongoose';

export const ChatSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message',
  }],
  isPrivate: Boolean,
  moderators: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
});
