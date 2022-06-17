"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserRouter_1 = __importDefault(require("./app/routes/UserRouter"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const PORT = 5000;
const app = (0, express_1.default)();
//middleware to parse incoming request
app.use(express_1.default.json());
//http request loggen middleware
app.use((0, morgan_1.default)("common"));
//http security middleware
app.use((0, helmet_1.default)());
// Apply the rate limiting middleware to all requests
app.use((0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: "Too many accounts Requests from this IP, please try again after an hour",
}));
app.use("/user", UserRouter_1.default);
app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
exports.default = app;
