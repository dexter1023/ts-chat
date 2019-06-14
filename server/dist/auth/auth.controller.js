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
const auth_service_1 = require("./auth.service");
const user_service_1 = require("src/user/user.service");
let AuthController = class AuthController {
    constructor(authService, userService) {
        this.authService = authService;
        this.userService = userService;
    }
    createToken(body, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!body.password || !body.email) {
                return res.status(common_1.HttpStatus.FORBIDDEN).json({ message: 'Email oraz hasło wymagane!' });
            }
            else {
                const user = yield this.userService.getUserByEmail(body.email);
                if (!user) {
                    return res.status(common_1.HttpStatus.FORBIDDEN).json({ message: 'Błędne dane logowania' });
                }
                else if (yield this.authService.compareHash(body.password, user.password)) {
                    const { email, _id, isAdmin, nick, } = user;
                    const token = yield this.authService.createToken({ nick, email, _id, isAdmin });
                    return res.json(token);
                }
                else {
                    return res.status(common_1.HttpStatus.FORBIDDEN).json({ message: 'Błędne dane logowania' });
                }
            }
        });
    }
    register(body, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(body.email && body.password && body.nick)) {
                return res.status(common_1.HttpStatus.BAD_REQUEST).json({ message: 'Niekompletne dane rejestracji' });
            }
            else {
                const user = yield this.userService.getUserByEmail(body.email);
                if (user) {
                    return res.status(common_1.HttpStatus.BAD_REQUEST).json({ message: 'Użytkownik o tym adresie już istnieje' });
                }
                else {
                    const registerUser = yield this.userService.saveUser(body, false);
                    if (registerUser) {
                        return res.status(common_1.HttpStatus.OK).json({ message: 'Correct registry' });
                    }
                    else {
                        return res.status(common_1.HttpStatus.BAD_REQUEST).json({ message: 'Nieoczekiwany błąd, spróbuj za chwilę jeszcze raz' });
                    }
                }
            }
        });
    }
};
__decorate([
    common_1.Post('login'),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "createToken", null);
__decorate([
    common_1.Post('register'),
    __param(0, common_1.Body()), __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
AuthController = __decorate([
    common_1.Controller('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService, user_service_1.UserService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map