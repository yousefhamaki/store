import Product from "../types/product.type";
import db from "../database/Connect";

class ProductModel {
  async create(product: Product): Promise<Product> {
    try {
      const connect = await db.connect();
      const query = `INSERT INTO products (name, price) 
                      values ($1, $2) returning *`;
      const result = await connect.query(query, [product.name, product.price]);
      //release connection
      connect.release();
      //return result
      return result.rows[0];
    } catch (err) {
      throw new Error(`Unable to create user`);
    }
  }
  async getAll(): Promise<Product[]> {
    try {
      const connect = await db.connect();
      const query = `SELECT * FROM products`;
      const result = await connect.query(query);
      //release connection
      connect.release();
      //return result
      return result.rows;
    } catch (err) {
      throw new Error(`Unable to get products : ${(err as Error).message}`);
    }
  }
  async getProduct(id: string): Promise<Product> {
    try {
      const connect = await db.connect();
      const query = `SELECT * FROM products WHERE id=$1`;
      const result = await connect.query(query, [id]);
      //release connection
      connect.release();
      //return result
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not find product ${id} : ${(err as Error).message}`
      );
    }
  }
}

export default ProductModel;
