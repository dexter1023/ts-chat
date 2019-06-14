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
const message_service_1 = require("./message.service");
const validate_object_id_pipes_1 = require("../shared/pipes/validate-object-id.pipes");
let MessageController = class MessageController {
    constructor(messageService) {
        this.messageService = messageService;
    }
    deleteMessage(req, id, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = yield this.messageService.getMessage(id);
            if (req.user && (req.user.isAdmin || req.user._id === message.user)) {
                const isDelete = yield this.messageService.deleteMessage(id);
                if (!isDelete) {
                    return res.status(common_1.HttpStatus.BAD_REQUEST).json({ message: 'Błąd usunięcia wiadomości' });
                }
                else {
                    return res.status(common_1.HttpStatus.OK).json({ message: 'Wiadomość usunięta poprawnie' });
                }
            }
            else {
                return res.status(common_1.HttpStatus.FORBIDDEN).json({ message: 'Brak wymaganych uprawnień do usunięcia wiadomości' });
            }
        });
    }
};
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Req()), __param(1, common_1.Param('id', new validate_object_id_pipes_1.ValidateObjectId())), __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], MessageController.prototype, "deleteMessage", null);
MessageController = __decorate([
    common_1.Controller('message'),
    __metadata("design:paramtypes", [message_service_1.MessageService])
], MessageController);
exports.MessageController = MessageController;
//# sourceMappingURL=message.controller.js.map