"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const user_module_1 = require("src/user/user.module");
const message_module_1 = require("src/message/message.module");
const auth_module_1 = require("src/auth/auth.module");
const fasade_service_1 = require("./fasade.service");
let FasadeModule = class FasadeModule {
};
FasadeModule = __decorate([
    common_1.Module({
        imports: [user_module_1.UserModule, message_module_1.MessageModule, auth_module_1.AuthModule],
        providers: [fasade_service_1.FasadeService],
        exports: [fasade_service_1.FasadeService],
    })
], FasadeModule);
exports.FasadeModule = FasadeModule;
//# sourceMappingURL=fasade.module.js.map