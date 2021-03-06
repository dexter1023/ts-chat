import { Schema } from 'mongoose';
import { genSalt, hash, compare } from 'bcrypt';
const SALT_WORK_FACTOR = 10;

const user = new Schema({
  nick: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
    dropDups: true,
  },
  password: {
    type: String,
    require: true,
  },
  isAdmin: Boolean,
  avatar: String,
});

user.pre('save', function(next) {
  const user = this;
  genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) {
      return next(err);
    }
    hash(user.password, salt, (error, hash: string) => {
      if (error) {
        return next(error);
      }
      user.password = hash;
      next();
    });
  });
});

user.methods.serialize = (user) => {
  const {
    _id,
    email,
    nick,
    isAdmin,
  } = user;
  return {
    _id,
    email,
    nick,
    isAdmin,
  };
};

export const UserSchema = user;
