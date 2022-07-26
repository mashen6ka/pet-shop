import { ClientEntity } from "../entity";
import IClientRepo from "./IClientRepo";
import { Client as pgConn } from "pg";

export default class PgClientRepo implements IClientRepo {
  private conn: pgConn;

  constructor(conn: pgConn) {
    this.conn = conn;
  }

  async createClient(client: ClientEntity): Promise<Number> {
    const res = await this.conn.query(
      `INSERT INTO client (login, password, first_name, last_name, 
       middle_name, birthday, email, phone, personal_discount) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING id`,
      [
        client.login,
        client.password,
        client.firstName,
        client.lastName,
        client.middleName,
        client.birthday,
        client.email,
        client.phone,
        client.personalDiscount,
      ]
    );
    return res?.rows?.[0]?.id;
  }

  async updateClient(client: ClientEntity): Promise<void> {
    await this.conn.query(
      `UPDATE client SET (login, password, first_name, last_name, 
       middle_name, birthday, email, phone, personal_discount) 
       = ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       WHERE id = $10`,
      [
        client.login,
        client.password,
        client.firstName,
        client.lastName,
        client.middleName,
        client.birthday,
        client.email,
        client.phone,
        client.personalDiscount,
        client.id,
      ]
    );
  }

  async deleteClient(id: number): Promise<void> {
    await this.conn.query(
      `DELETE FROM client
       WHERE id = $1`,
      [id]
    );
  }

  async getClient(id: number): Promise<ClientEntity> {
    const res = await this.conn.query(
      `SELECT * from client
       WHERE id = $1`,
      [id]
    );
    const client = new ClientEntity(res.rows[0]);

    return client;
  }
}
