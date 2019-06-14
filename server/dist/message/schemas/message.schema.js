"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
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
message.pre('save', function (next) {
    this.createdAt = new Date(Date.now()).toISOString();
    next();
});
exports.MessageSchema = message;
//# sourceMappingURL=message.schema.js.map