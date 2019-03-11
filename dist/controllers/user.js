"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const register = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        res.json({ message: 'register' });
    }
    catch (error) {
        throw error;
    }
});
exports.register = register;
const login = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        res.json({ message: 'login' });
    }
    catch (error) {
        throw error;
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        res.json({ message: 'logout' });
    }
    catch (error) {
        throw error;
    }
});
exports.logout = logout;
//# sourceMappingURL=user.js.map