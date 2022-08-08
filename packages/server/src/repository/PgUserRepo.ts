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
    const userFields = res.rows[0];
    const user = new UserEntity({
      id: userFields.id,
      login: userFields.login,
      password: userFields.password,
      worker: userFields.worker,
      firstName: userFields.firstName,
      lastName: userFields.lastName,
      middleName: userFields.middleName,
      birthday: userFields.birthday,
      email: userFields.birthday,
      phone: userFields.phone,
      personalDiscount: userFields.personalDiscount,
    });

    return user;
  }

  async getUserCompanyList(userId: number): Promise<Array<CompanyEntity>> {
    const res = await this.conn.query(
      `SELECT id, name, "KPP", "INN", address
       FROM "company" c JOIN user__company uc ON c.id = uc.company_id
       WHERE uc.user_id = $1`,
      [userId]
    );
    let companyList: Array<CompanyEntity> = [];
    for (let companyFields of res.rows) {
      companyList.push(
        new CompanyEntity({
          id: companyFields.id,
          name: companyFields.name,
          KPP: companyFields.KPP,
          INN: companyFields.INN,
          address: companyFields.address,
        })
      );
    }
    return companyList;
  }

  // добавить верификацию компаний, чтоб потом убрать дубли
  async createUserCompany(userId: number, companyId: number): Promise<void> {
    const res = await this.conn.query(
      `INSERT INTO "user__company" (user_id, company_id)
       VALUES ($1, $2)`,
      [userId, companyId]
    );
  }

  async deleteUserCompany(userId: number, companyId: number): Promise<void> {
    const res = await this.conn.query(
      `DELETE FROM "user__company"
       WHERE user_id = $1 AND company_id = $2`,
      [userId, companyId]
    );
  }
}
