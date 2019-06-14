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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const websockets_1 = require("@nestjs/websockets");
const fasade_service_1 = require("src/common/fasade/fasade.service");
let ChatGateway = class ChatGateway {
    constructor(service) {
        this.service = service;
    }
    handleConnection(socket) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!socket.handshake.query.token) {
                throw new websockets_1.WsException('Brak autoryzacji');
            }
            else {
                const user = yield this.service.validateToken(socket.handshake.query.token, true);
                if (!user) {
                    throw new websockets_1.WsException('Brak autoryzacji');
                }
                else {
                    socket.user = user;
                    const users = yield this.service.getUsers();
                    const messages = yield this.service.getMessages();
                    const chat = {
                        name: 'General',
                        users,
                        messages,
                    };
                    socket.emit('connected', chat);
                }
            }
        });
    }
    handleDisconnect(socket) {
        socket.emit('disconnect', 'Rozłączono z czatek');
    }
    onMessage(socket, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const event = 'message';
            const message = yield this.service.saveMessage(body);
            this.server.emit(event, message);
        });
    }
    onDeleteMessage(socket, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = yield this.service.getMessage(body.messageId);
            if (socket.user && (socket.user.isAdmin || socket.user._id.toString() === message.user._id.toString())) {
                yield this.service.deleteMessage(body.messageId);
                this.server.emit('deleteMessage', { messageId: message._id });
            }
            else {
                throw new websockets_1.WsException('Brak uprawnień do usunięcia wiadomości');
            }
        });
    }
};
__decorate([
    websockets_1.WebSocketServer(),
    __metadata("design:type", Object)
], ChatGateway.prototype, "server", void 0);
__decorate([
    websockets_1.SubscribeMessage('message'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "onMessage", null);
__decorate([
    websockets_1.SubscribeMessage('deleteMessage'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "onDeleteMessage", null);
ChatGateway = __decorate([
    websockets_1.WebSocketGateway(4000, { namespace: 'rooms' }),
    __metadata("design:paramtypes", [fasade_service_1.FasadeService])
], ChatGateway);
exports.ChatGateway = ChatGateway;
//# sourceMappingURL=chat.gateway.js.map