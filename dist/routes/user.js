"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRouter = express_1.default.Router();
userRouter.get('/logout', (req, res) => {
    res.json({ message: 'logout test' });
});
exports.default = userRouter;
//# sourceMappingURL=user.js.map