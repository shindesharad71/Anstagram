"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const chalk_1 = __importDefault(require("chalk"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const routes_1 = require("./routes");
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
// Middleware Initialization
app.use(cors_1.default());
app.use(body_parser_1.default.json({ limit: '50mb' }));
app.use(body_parser_1.default.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
// Routes
routes_1.Routes.forEach((route) => app.use(route.path, route.router));
app.use('*', (req, res, next) => {
    const message = `Cannot ${req.method} ${req.url}`;
    res.status(404).json({ error: message });
    next();
});
// Start Server
app.listen(process.env.PORT, () => {
    console.log(chalk_1.default.green(`✗ Server started at http://localhost:${process.env.PORT}`));
});
//# sourceMappingURL=index.js.map