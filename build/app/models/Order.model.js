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
class OrderModel {
    create(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield Connect_1.default.connect();
                const query = `
                  insert into orders (user_id, quantity, status, product_id)
                  values 
                  ( $1, $2, $3, $4 ) returning *`;
                const result = yield connect.query(query, [
                    order.user_id,
                    order.quantity,
                    "active",
                    order.product_id,
                ]);
                connect.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Unable to create order : ${err.message}`);
            }
        });
    }
    getOrder(id, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield Connect_1.default.connect();
                const query = `SELECT * FROM products
                        INNER JOIN orders
                            ON products.id = orders.product_id
                        WHERE
                            orders.id = $1 
                        AND 
                            orders.user_id = $2`;
                const result = yield connect.query(query, [id, user_id]);
                connect.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Unable to get order ${id} : ${err.message}`);
            }
        });
    }
    getUserOrders(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield Connect_1.default.connect();
                const query = `SELECT * FROM products
                        INNER JOIN orders
                            ON products.id = orders.product_id
                        WHERE
                            orders.user_id = $1`;
                const result = yield connect.query(query, [user_id]);
                connect.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Unable to get orders of this user ${user_id} : ${err.message}`);
            }
        });
    }
    deleteOrder(id, user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield Connect_1.default.connect();
                const query = `DELETE FROM orders WHERE id = $1 AND user_id=$2 returning *`;
                const result = yield connect.query(query, [id, user_id]);
                connect.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Unable to remove order ${id} : ${err.message}`);
            }
        });
    }
    update(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield Connect_1.default.connect();
                const query = `
                  UPDATE orders SET user_id=$1 ,quantity=$2 ,status=$3 ,product_id=$4
                  WHERE id=$5 returning *`;
                const result = yield connect.query(query, [
                    order.user_id,
                    order.quantity,
                    order.status,
                    order.product_id,
                    order.id,
                ]);
                connect.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Unable to create order : ${err.message}`);
            }
        });
    }
}
exports.default = OrderModel;
