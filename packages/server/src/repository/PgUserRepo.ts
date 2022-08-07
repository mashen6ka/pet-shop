import { CompanyEntity, UserEntity } from "../entity";
import IUserRepo from "./IUserRepo";
import { Client as pgConn } from "pg";

export default class PgUserRepo implements IUserRepo {
  private conn: pgConn;

  constructor(conn: pgConn) {
    this.conn = conn;
  }

  async createUser(user: UserEntity): Promise<Number> {
    const res = await this.conn.query(
      `INSERT INTO "user" (login, password, first_name, last_name, 
       middle_name, birthday, email, phone, personal_discount, worker) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       RETURNING id`,
      [
        user.login,
        user.password,
        user.firstName,
        user.lastName,
        user.middleName,
        user.birthday,
        user.email,
        user.phone,
        user.personalDiscount,
        user.worker,
      ]
    );
    return res?.rows?.[0]?.id;
  }

  async updateUser(user: UserEntity): Promise<void> {
    await this.conn.query(
      `UPDATE "user" SET (login, password, first_name, last_name, 
       middle_name, birthday, email, phone, personal_discount, worker) 
       = ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
       WHERE id = $11`,
      [
        user.login,
        user.password,
        user.firstName,
        user.lastName,
        user.middleName,
        user.birthday,
        user.email,
        user.phone,
        user.personalDiscount,
        user.worker,
        user.id,
      ]
    );
  }

  async deleteUser(id: number): Promise<void> {
    await this.conn.query(
      `DELETE FROM "user"
       WHERE id = $1`,
      [id]
    );
  }

  async getUser(id: number): Promise<UserEntity> {
    const res = await this.conn.query(
      `SELECT * from "user"
       WHERE id = $1`,
      [id]
    );
    const user = new UserEntity(res.rows[0]);

    return user;
  }

  async getUserCompanyList(id: number): Promise<Array<CompanyEntity>> {
    const res = await this.conn.query(
      `SELECT id, name, "KPP", "INN", address
       FROM "company" c JOIN user__company uc ON c.id = uc.company_id
       WHERE uc.user_id = $1`,
      [id]
    );
    let companyList: Array<CompanyEntity> = [];
    for (let company of res.rows) {
      companyList.push(new CompanyEntity(company));
    }
    return companyList;
  }
}
