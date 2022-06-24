"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const Error_middleware_1 = __importDefault(require("./app/middleware/Error.middleware"));
const config_1 = __importDefault(require("./app/config"));
const index_1 = __importDefault(require("./app/routes/index"));
const PORT = config_1.default.port || 5000;
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
//routers
app.get("/", (_, res) => {
    return res.status(200).json({
        status: "success",
        message: "Welcome to store App",
    });
});
app.use("/api", index_1.default);
//handle errors
app.use(Error_middleware_1.default);
//404 Request
app.use((_req, res) => {
    res.status(404).json({
        status: "error",
        message: "ohh you are lost, read the documentation to find your way",
    });
});
app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
exports.default = app;
