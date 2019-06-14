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
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const user_service_1 = require("../user/user.service");
const bcrypt = require("bcrypt");
const websockets_1 = require("@nestjs/websockets");
const config = require("../config/config.json");
let AuthService = class AuthService {
    constructor(userService) {
        this.userService = userService;
    }
    createToken(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const expiresIn = 6000 * 60;
            const secretOrKey = config.secretKey;
            const token = jwt.sign(payload, secretOrKey);
            return { expires_in: expiresIn, token };
        });
    }
    validateToken(token, isWs = false) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = jwt.verify(token, config.secretKey);
            if (payload) {
                const user = yield this.userService.getUserByEmail(payload.email);
                if (!user) {
                    if (isWs) {
                        throw new websockets_1.WsException('Brak dostępu, błędna autoryzacja');
                    }
                    else {
                        throw new common_1.HttpException('Brak dostępu, błędny token', common_1.HttpStatus.FORBIDDEN);
                    }
                }
                else {
                    return user;
                }
            }
            else {
                if (isWs) {
                    throw new websockets_1.WsException('Brak dostępu, brak dostępu, błędny token');
                }
                else {
                    throw new common_1.HttpException('Brak dostępu, błędny token', common_1.HttpStatus.FORBIDDEN);
                }
            }
        });
    }
    compareHash(credentialPassword, userPassword) {
        return bcrypt.compare(credentialPassword, userPassword);
    }
};
AuthService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map