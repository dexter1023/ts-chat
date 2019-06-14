"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
var _a;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
const message_service_1 = require("../message/message.service");
let ChatService = class ChatService {
    constructor(ChatModel, messageService) {
        this.ChatModel = ChatModel;
        this.messageService = messageService;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const chats = yield this.ChatModel.find({}).exec();
            return chats;
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const chat = yield this.ChatModel.findById(id).exec();
            return chat;
        });
    }
    saveChat(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const chat = this.ChatModel(body);
            return yield chat.save();
        });
    }
    getAllForUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const chat = yield this.ChatModel
                    .find({ users: mongoose_1.Types.ObjectId(id) })
                    .populate('users', 'nick')
                    .populate('messages')
                    .exec();
                return chat;
            }
            catch (e) {
                throw new common_1.HttpException('Cannot find chats', common_1.HttpStatus.NOT_FOUND);
            }
        });
    }
    updateChatName(id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const chat = yield this.ChatModel.findByIdAndUpdate(id, {
                $set: {
                    name,
                },
            }, { new: true });
            return chat;
        });
    }
    updateChatModerators(id, moderators) {
        return __awaiter(this, void 0, void 0, function* () {
            const chat = this.ChatModel.findByIdAndUpdate(id, {
                $set: {
                    moderators,
                },
            }, { new: true });
            return chat;
        });
    }
    saveMessageToChat(id, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const newMessage = yield this.messageService.saveMessage(message);
            yield this.ChatModel.findByIdAndUpdate(id, {
                $push: {
                    messages: newMessage._id,
                },
            }, {
                new: false,
            });
            return newMessage;
        });
    }
};
ChatService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_2.InjectModel('Chat')),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_1.Model !== "undefined" && mongoose_1.Model) === "function" ? _a : Object, message_service_1.MessageService])
], ChatService);
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map