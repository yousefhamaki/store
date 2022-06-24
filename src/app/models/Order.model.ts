import db from "../database/Connect";
import Order from "../types/order.type";

class OrderModel {
  async create(order: Order): Promise<Order> {
    try {
      const connect = await db.connect();
      const query = `
                  insert into orders (user_id, quantity, status, product_id)
                  values 
                  ( $1, $2, $3, $4 ) returning *`;
      const result = await connect.query(query, [
        order.user_id,
        order.quantity,
        "active",
        order.product_id,
      ]);
      connect.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable to create order : ${(err as Error).message}`);
    }
  }

  async getOrder(id: string, user_id: string): Promise<Order> {
    try {
      const connect = await db.connect();
      const query = `SELECT * FROM products
                        INNER JOIN orders
                            ON products.id = orders.product_id
                        WHERE
                            orders.id = $1 
                        AND 
                            orders.user_id = $2`;
      const result = await connect.query(query, [id, user_id]);
      connect.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable to get order ${id} : ${(err as Error).message}`);
    }
  }

  async getUserOrders(user_id: string): Promise<Order[]> {
    try {
      const connect = await db.connect();
      const query = `SELECT * FROM products
                        INNER JOIN orders
                            ON products.id = orders.product_id
                        WHERE
                            orders.user_id = $1`;
      const result = await connect.query(query, [user_id]);
      connect.release();
      return result.rows;
    } catch (err) {
      throw new Error(
        `Unable to get orders of this user ${user_id} : ${
          (err as Error).message
        }`
      );
    }
  }

  async deleteOrder(id: string, user_id: string): Promise<Order> {
    try {
      const connect = await db.connect();
      const query = `DELETE FROM orders WHERE id = $1 AND user_id=$2 returning *`;
      const result = await connect.query(query, [id, user_id]);
      connect.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Unable to remove order ${id} : ${(err as Error).message}`
      );
    }
  }

  async update(order: Order): Promise<Order> {
    try {
      const connect = await db.connect();
      const query = `
                  UPDATE orders SET user_id=$1 ,quantity=$2 ,status=$3 ,product_id=$4
                  WHERE id=$5 returning *`;
      const result = await connect.query(query, [
        order.user_id,
        order.quantity,
        order.status,
        order.product_id,
        order.id,
      ]);
      connect.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable to create order : ${(err as Error).message}`);
    }
  }
}

export default OrderModel;
