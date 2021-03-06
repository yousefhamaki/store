"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Connect_1 = __importDefault(require("../database/Connect"));
const HashPass_1 = __importDefault(require("./../traits/HashPass"));
class UserModel {
    //create user
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield Connect_1.default.connect();
                const query = `INSERT INTO users (email, username, firstname, lastname, password) 
                    values ($1, $2, $3, $4, $5) returning id, email, username, firstname, lastname`;
                const result = yield connect.query(query, [
                    user.email,
                    user.username,
                    user.firstname,
                    user.lastname,
                    HashPass_1.default.MakeHash(user.password),
                ]);
                //release connection
                connect.release();
                //return result
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Unable to create ${user.username} : ${err.message}`);
            }
        });
    }
    //get all users
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield Connect_1.default.connect();
                const query = `SELECT id, email, username, firstname, lastname FROM users`;
                const result = yield connect.query(query);
                //release connection
                connect.release();
                //return result
                return result.rows;
            }
            catch (err) {
                throw new Error(`Unable to get users : ${err.message}`);
            }
        });
    }
    //get specific user
    getUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield Connect_1.default.connect();
                const query = `SELECT email, username, firstname, lastname FROM users WHERE id=$1`;
                const result = yield connect.query(query, [id]);
                //release connection
                connect.release();
                //return result
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not find user ${id} : ${err.message}`);
            }
        });
    }
    //update user
    updateUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield Connect_1.default.connect();
                const query = `UPDATE users SET username=$1 , email=$2 , firstname=$3, lastname=$4 
                      WHERE id=$5 
                      returning username, email, firstname, lastname`;
                const result = yield connect.query(query, [
                    user.username,
                    user.email,
                    user.firstname,
                    user.lastname,
                    user.id,
                ]);
                //release connection
                connect.release();
                //return result
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not update user ${user.id} : ${err.message}`);
            }
        });
    }
    //delete user
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield Connect_1.default.connect();
                const query = `DELETE FROM users WHERE id=$1 returning *`;
                const result = yield connect.query(query, [id]);
                //release connection
                connect.release();
                //return result
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not delete user ${id} : ${err.message}`);
            }
        });
    }
    //auth user
    makeAuth(email, pass) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield Connect_1.default.connect();
                const query = `SELECT password FROM users WHERE email=$1`;
                const result = yield connect.query(query, [email]);
                if (result.rows.length > 0) {
                    const { password: hash } = result.rows[0];
                    if (HashPass_1.default.check(pass, hash)) {
                        const query = `SELECT id, username, firstname, lastname, email FROM users WHERE email=$1`;
                        const result = yield connect.query(query, [email]);
                        return result.rows[0];
                    }
                }
                connect.release();
                return null;
            }
            catch (err) {
                throw new Error(`unable to login ${email} : ${err.message}`);
            }
        });
    }
    //change password
    changePass(id, oldpass, newpass) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield Connect_1.default.connect();
                const query = `SELECT password FROM users WHERE id=$1`;
                const result = yield connect.query(query, [id]);
                if (result.rows.length > 0) {
                    const { password: hash } = result.rows[0];
                    const check = yield HashPass_1.default.check(oldpass, hash);
                    if (check) {
                        const query = `UPDATE users SET password=$1 WHERE id=$2`;
                        yield connect.query(query, [newpass, id]);
                        //release connection
                        connect.release();
                        return true;
                    }
                    else {
                        //release connection
                        connect.release();
                        return false;
                    }
                }
                else {
                    return false;
                }
            }
            catch (err) {
                throw new Error(`unable to change password of ${id} : ${err.message}`);
            }
        });
    }
}
exports.default = UserModel;
