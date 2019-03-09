"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ObjectId = Schema.Types.ObjectId;
const userSchema = new Schema({
    id: ObjectId,
    firstName: { type: String, trim: true },
    lastName: { type: String, trim: true },
    email: {
        type: String, unique: true
    },
    dateOfBirth: Date,
    password: String
});
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
//# sourceMappingURL=user.js.map