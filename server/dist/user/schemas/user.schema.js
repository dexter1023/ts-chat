"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt_1 = require("bcrypt");
const SALT_WORK_FACTOR = 10;
const user = new mongoose_1.Schema({
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
user.pre('save', function (next) {
    const user = this;
    bcrypt_1.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) {
            return next(err);
        }
        bcrypt_1.hash(user.password, salt, (error, hash) => {
            if (error) {
                return next(error);
            }
            user.password = hash;
            next();
        });
    });
});
user.methods.serialize = (user) => {
    const { _id, email, nick, isAdmin, } = user;
    return {
        _id,
        email,
        nick,
        isAdmin,
    };
};
exports.UserSchema = user;
//# sourceMappingURL=user.schema.js.map