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
const common_1 = require("@nestjs/common");
const chat_service_1 = require("./chat.service");
const create_chat_dto_1 = require("./dto/create-chat.dto");
const validate_object_id_pipes_1 = require("../shared/pipes/validate-object-id.pipes");
let ChatController = class ChatController {
    constructor(chatService) {
        this.chatService = chatService;
    }
    getChat(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const chats = yield this.chatService.getAllForUser(req.user._id);
            res.status(common_1.HttpStatus.OK).json(chats);
        });
    }
    saveChat(body, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const chat = yield this.chatService.saveChat(body);
            res.status(common_1.HttpStatus.OK).json(chat);
        });
    }
    updateChat(res, id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const chat = yield this.chatService.updateChatName(id, body.name);
            res.status(common_1.HttpStatus.OK).json(chat);
        });
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Req()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "getChat", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_chat_dto_1.CreateChatDTO, Object]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "saveChat", null);
__decorate([
    common_1.Put(':id/name'),
    __param(0, common_1.Res()), __param(1, common_1.Param('id', new validate_object_id_pipes_1.ValidateObjectId())), __param(2, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, create_chat_dto_1.CreateChatDTO]),
    __metadata("design:returntype", Promise)
], ChatController.prototype, "updateChat", null);
ChatController = __decorate([
    common_1.Controller('chat'),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatController);
exports.ChatController = ChatController;
//# sourceMappingURL=chat.controller.js.map