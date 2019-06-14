"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.ChatSchema = new mongoose.Schema({
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
//# sourceMappingURL=chat.shema.js.map