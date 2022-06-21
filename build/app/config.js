"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { PORT, PGHOST, NODE_ENV, PGUSER, PGPASSWORD, PGDATABASE, PGDATABASE_TEST, PGPORT, BCRYPT_PASSWORD, BCRYPT_ROUNDS, TOKEN_SECRET, } = process.env;
exports.default = {
    port: PORT,
    dbhost: PGHOST,
    dbuser: PGUSER,
    dbpass: PGPASSWORD,
    database: NODE_ENV === "dev" ? PGDATABASE : PGDATABASE_TEST,
    dbport: PGPORT,
    pcryptPass: BCRYPT_PASSWORD,
    pacryptRounds: BCRYPT_ROUNDS,
    secretToken: TOKEN_SECRET,
};
