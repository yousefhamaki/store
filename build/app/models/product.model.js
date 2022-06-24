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
class ProductModel {
    create(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield Connect_1.default.connect();
                const query = `INSERT INTO products (name, price) 
                      values ($1, $2) returning *`;
                const result = yield connect.query(query, [product.name, product.price]);
                //release connection
                connect.release();
                //return result
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Unable to create user`);
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield Connect_1.default.connect();
                const query = `SELECT * FROM products`;
                const result = yield connect.query(query);
                //release connection
                connect.release();
                //return result
                return result.rows;
            }
            catch (err) {
                throw new Error(`Unable to get products : ${err.message}`);
            }
        });
    }
    getProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield Connect_1.default.connect();
                const query = `SELECT * FROM products WHERE id=$1`;
                const result = yield connect.query(query, [id]);
                //release connection
                connect.release();
                //return result
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not find product ${id} : ${err.message}`);
            }
        });
    }
    //update product
    updateProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield Connect_1.default.connect();
                const query = `UPDATE products SET name=$1 , price=$2 WHERE id=$3 returning *`;
                const result = yield connect.query(query, [
                    product.name,
                    product.price,
                    product.id,
                ]);
                //release connection
                connect.release();
                //return result
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Could not update user ${product.id} : ${err.message}`);
            }
        });
    }
    //delete product
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield Connect_1.default.connect();
                const query = `DELETE FROM products WHERE id=$1 returning *`;
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
}
exports.default = ProductModel;
