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
const orderQuery_1 = __importDefault(require("../traits/orderQuery"));
class OrderModel {
    create(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield Connect_1.default.connect();
                const query = (0, orderQuery_1.default)(order.products, order.user_id, "active");
                const result = yield connect.query(query, []);
                connect.release();
                return result.rows;
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
                const query = `SELECT  
                      products.id, products.name, products.price, 
                      orders.user_id, product_orders.product_id,
                      product_orders.order_id  
                        FROM products
                        INNER JOIN product_orders
                            ON products.id = product_orders.product_id
                        INNER JOIN orders
                            ON orders.id = product_orders.order_id
                        WHERE
                          product_orders.order_id = $1 
                        AND 
                            orders.user_id = $2;`;
                const result = yield connect.query(query, [id, user_id]);
                connect.release();
                return result.rows;
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
                const query = `SELECT  
                      array_to_json(array_agg(products.*)) as products, 
                      orders.user_id, product_orders.product_id,
                      product_orders.order_id  
                        FROM products
                        INNER JOIN product_orders
                            ON products.id = product_orders.product_id
                        INNER JOIN orders
                            ON orders.id = product_orders.order_id
                        WHERE
                            orders.user_id = $1
                        AND
                            status='active'
                        GROUP BY
                            orders.user_id, product_orders.product_id, product_orders.order_id, orders.id
                        ORDER BY orders.id ASC
                        LIMIT 1;`;
                const result = yield connect.query(query, [user_id]);
                connect.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Unable to get orders of this user ${user_id} : ${err.message}`);
            }
        });
    }
    completedOrders(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield Connect_1.default.connect();
                const query = `SELECT  
                      array_to_json(array_agg(products.*)) as products, 
                      orders.user_id, product_orders.product_id,
                      product_orders.order_id  
                        FROM products
                        INNER JOIN product_orders
                            ON products.id = product_orders.product_id
                        INNER JOIN orders
                            ON orders.id = product_orders.order_id
                        WHERE
                            orders.user_id = $1
                        AND
                            status='complete'
                        GROUP BY
                            orders.user_id, product_orders.product_id, product_orders.order_id, orders.id
                        ORDER BY orders.id ASC
                        LIMIT 1;`;
                const result = yield connect.query(query, [user_id]);
                connect.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Unable to get orders of this user ${user_id} : ${err.message}`);
            }
        });
    }
}
exports.default = OrderModel;
