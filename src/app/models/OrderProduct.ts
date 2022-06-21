import OrderProduct from "../types/orderProduct.type";
import db from "../database/Connect";

class OrderProducts {
  async create(order: OrderProduct) {
    try {
      const connect = await db.connect();
      const query = `with new_order as (
                insert into orders (user_id, status) values ($1, $2)
                returning id
              )
              insert into order_products (quantity, order_id, product_id)
              values 
              ( $3, 
                (select id from new_order), $4
              )`;
      const result = await connect.query(query, [
        order.user_id,
        false,
        order.quantity,
        order.product_id,
      ]);
      connect.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable to create order : ${(err as Error).message}`);
    }
  }

  async getAll() {
    try {
      const connect = await db.connect();
      const query = `SELECT * FROM order_products p
                    INNER JOIN prders o 
                        ON o.id = p.order_id`;
      const result = await connect.query(query, []);
      connect.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Unable to get orders : ${(err as Error).message}`);
    }
  }

  async getOrder(id: string) {
    try {
      const connect = await db.connect();
      const query = `SELECT * FROM order_products p
                        WHERE order_id=$1
                    INNER JOIN prders o 
                        ON o.id = p.order_id`;
      const result = await connect.query(query, [id]);
      connect.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable to get order ${id} : ${(err as Error).message}`);
    }
  }

  async deleteOrder(id: string) {
    try {
      const connect = await db.connect();
      const query = `WITH order AS (
        DELETE from orders where id = $1 returning id
    )
    delete from order_products where order_id in (select id from order.id)
    `;
      const result = await connect.query(query, [id]);
      connect.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Unable to remove order ${id} : ${(err as Error).message}`
      );
    }
  }
}

export default OrderProducts;
