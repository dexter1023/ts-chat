"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const auth_service_1 = require("./auth.service");
const jwt_strategy_1 = require("./jwt/jwt.strategy");
const user_module_1 = require("../user/user.module");
const passport_1 = require("@nestjs/passport");
const auth_controller_1 = require("./auth.controller");
const passport_2 = require("passport");
let AuthModule = class AuthModule {
    configure(consumer) {
        consumer
            .apply(passport_2.authenticate('jwt', { session: false }))
            .forRoutes({ path: '/user/*', method: common_1.RequestMethod.ALL }, { path: '/user', method: common_1.RequestMethod.ALL }, { path: '/chat/*', method: common_1.RequestMethod.ALL }, { path: '/chat', method: common_1.RequestMethod.ALL }, { path: '/message', method: common_1.RequestMethod.ALL }, { path: '/message/*', method: common_1.RequestMethod.ALL });
    }
};
AuthModule = __decorate([
    common_1.Module({
        imports: [
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.register({
                secretOrPrivateKey: 'asfgshdsffDasdcaD',
                signOptions: {
                    expiresIn: 6000 * 60,
                },
            }),
            user_module_1.UserModule,
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, jwt_strategy_1.JwtService],
        exports: [passport_1.PassportModule, auth_service_1.AuthService],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map