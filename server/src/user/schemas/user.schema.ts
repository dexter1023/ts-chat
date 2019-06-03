import { Schema } from 'mongoose';

const user = new Schema({
  nick: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  isAdmin: Boolean,
  avatar: String,
})

user.methods.serialize = (user) => {
  const {
    _id,
    email,
    nick,
    avatar,
  } = user;
  return {
    _id,
    email,
    nick,
    avatar,
  };
}

export const UserSchema = user;
