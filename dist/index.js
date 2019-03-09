"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("./models/user"));
// Init dotenv config
dotenv_1.default.config();
const app = express_1.default();
// Connect to MongoDB.
mongoose_1.default.set("useFindAndModify", false);
mongoose_1.default.set("useCreateIndex", true);
mongoose_1.default.set("useNewUrlParser", true);
mongoose_1.default.connect(`${process.env.MONGO_URL}${process.env.MONGO_DB_NAME}`);
mongoose_1.default.connection.on("error", (err) => {
    console.error(err);
    console.log("%s MongoDB connection error. Please make sure MongoDB is running.", chalk_1.default.red("✗"));
    process.exit();
});
// Routes
app.get("/", (req, res) => __awaiter(this, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.find({});
        res.send(users);
    }
    catch (error) {
        throw error;
    }
}));
// Start Server
app.listen(process.env.PORT, () => {
    console.log(`Server started at http://localhost:${process.env.PORT}`);
});
//# sourceMappingURL=index.js.map