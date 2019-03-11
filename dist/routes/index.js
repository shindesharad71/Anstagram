"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("./user"));
const Routes = [
    {
        path: '/users',
        router: user_1.default
    }
];
exports.Routes = Routes;
//# sourceMappingURL=index.js.map