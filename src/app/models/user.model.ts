import User from "../types/user.type";
import db from "../database/Connect";
import HashPass from "./../traits/HashPass";

class UserModel {
  //create user
  async create(user: User): Promise<User> {
    try {
      const connect = await db.connect();
      const query = `INSERT INTO users (email, username, firstname, lastname, password) 
                    values ($1, $2, $3, $4, $5) returning email, username, firstname, lastname, password`;
      const result = await connect.query(query, [
        user.email,
        user.username,
        user.firstname,
        user.lastname,
        HashPass.MakeHash(user.password),
      ]);
      //release connection
      connect.release();
      //return result
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Unable to create ${user.username} : ${(err as Error).message}`
      );
    }
  }
  //get all users
  async getAll(): Promise<User[]> {
    try {
      const connect = await db.connect();
      const query = `SELECT email, username, firstname, lastname FROM users`;
      const result = await connect.query(query);
      //release connection
      connect.release();
      //return result
      return result.rows;
    } catch (err) {
      throw new Error(`Unable to get users : ${(err as Error).message}`);
    }
  }
  //get specific user
  async getUser(id: string): Promise<User> {
    try {
      const connect = await db.connect();
      const query = `SELECT email, username, firstname, lastname FROM users WHERE id=$1`;
      const result = await connect.query(query, [id]);
      //release connection
      connect.release();
      //return result
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find user ${id} : ${(err as Error).message}`);
    }
  }
  //update user
  async updateUser(user: User): Promise<User> {
    try {
      const connect = await db.connect();
      const query = `UPDATE users SET username=$1 , email=$2 , firstname=$3, lastname=$4 WHERE id=$5`;
      const result = await connect.query(query, [
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
    } catch (err) {
      throw new Error(
        `Could not update user ${user.id} : ${(err as Error).message}`
      );
    }
  }
  //delete user
  async deleteUser(id: string): Promise<User> {
    try {
      const connect = await db.connect();
      const query = `UPDATE users WHERE id=$1`;
      const result = await connect.query(query, [id]);
      //release connection
      connect.release();
      //return result
      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not delete user ${id} : ${(err as Error).message}`
      );
    }
  }
  //auth user
  async makeAuth(email: string, pass: string): Promise<User | null> {
    try {
      const connect = await db.connect();
      const query = `SELECT password FROM users WHERE email=$1`;
      const result = await connect.query(query, [email]);

      if (result.rows.length > 0) {
        const { password: hash } = result.rows[0];

        if (HashPass.check(pass, hash)) {
          const query = `SELECT id, username, firstname, lastname, email FROM users WHERE email=$1`;
          const result = await connect.query(query, [email]);
          return result.rows[0];
        }
      }
      connect.release();
      return null;
    } catch (err) {
      throw new Error(`unable to login ${email} : ${(err as Error).message}`);
    }
  }
  //change password
  async changePass(
    id: string,
    oldpass: string,
    newpass: string
  ): Promise<boolean> {
    try {
      const connect = await db.connect();
      const query = `SELECT password FROM users WHERE id=$1 AND password=$2`;
      const result = await connect.query(query, [id, oldpass]);
      if (result.rows.length > 0) {
        const query = `UPDATE users SET password=$1`;
        await connect.query(query, [newpass]);
        //release connection
        connect.release();
        //return result
        return true;
      } else {
        return false;
      }
    } catch (err) {
      throw new Error(
        `unable to change password of ${id} : ${(err as Error).message}`
      );
    }
  }
}

export default UserModel;
