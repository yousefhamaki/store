import db from "../database/Connect";
import Order from "../types/order.type";
import insertOrder from "../traits/orderQuery";

class OrderModel {
  async create(order: Order): Promise<Order[]> {
    try {
      const connect = await db.connect();
      const query = insertOrder(order.products, order.user_id, "active");
      const result = await connect.query(query, []);
      connect.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Unable to create order : ${(err as Error).message}`);
    }
  }

  async getOrder(id: string, user_id: string): Promise<Order[]> {
    try {
      const connect = await db.connect();
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
      const result = await connect.query(query, [id, user_id]);
      connect.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Unable to get order ${id} : ${(err as Error).message}`);
    }
  }

  async getUserOrders(user_id: string): Promise<Order[]> {
    try {
      const connect = await db.connect();
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

  async completedOrders(user_id: string): Promise<Order[]> {
    try {
      const connect = await db.connect();
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
}

export default OrderModel;
