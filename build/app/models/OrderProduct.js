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
class OrderProducts {
    create(order) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield Connect_1.default.connect();
                const query = `with new_order as (
                insert into orders (user_id, status) values ($1, $2)
                returning id
              )
              insert into order_products (quantity, order_id, product_id)
              values 
              ( $3, 
                (select id from new_order), $4
              )`;
                const result = yield connect.query(query, [
                    order.user_id,
                    false,
                    order.quantity,
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
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield Connect_1.default.connect();
                const query = `SELECT * FROM order_products p
                    INNER JOIN prders o 
                        ON o.id = p.order_id`;
                const result = yield connect.query(query, []);
                connect.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Unable to get orders : ${err.message}`);
            }
        });
    }
    getOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield Connect_1.default.connect();
                const query = `SELECT * FROM order_products p
                        WHERE order_id=$1
                    INNER JOIN prders o 
                        ON o.id = p.order_id`;
                const result = yield connect.query(query, [id]);
                connect.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Unable to get order ${id} : ${err.message}`);
            }
        });
    }
    deleteOrder(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield Connect_1.default.connect();
                const query = `WITH order AS (
        DELETE from orders where id = $1 returning id
    )
    delete from order_products where order_id in (select id from order.id)
    `;
                const result = yield connect.query(query, [id]);
                connect.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Unable to remove order ${id} : ${err.message}`);
            }
        });
    }
}
exports.default = OrderProducts;
