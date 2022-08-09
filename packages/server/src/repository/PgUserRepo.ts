import { CompanyEntity, OrderEntity, UserEntity } from "../entity";
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
      firstName: userFields.first_name,
      lastName: userFields.last_name,
      middleName: userFields.middle_name,
      birthday: userFields.birthday.toLocaleDateString(),
      email: userFields.email,
      phone: userFields.phone,
      personalDiscount: userFields.personal_discount,
    });

    return user;
  }

  async getUserList(): Promise<Array<UserEntity>> {
    const res = await this.conn.query(`SELECT * from "user"`, []);
    const userList: Array<UserEntity> = [];
    for (let userFields of res.rows) {
      const user = new UserEntity({
        id: userFields.id,
        login: userFields.login,
        password: userFields.password,
        worker: userFields.worker,
        firstName: userFields.first_name,
        lastName: userFields.last_name,
        middleName: userFields.middle_name,
        birthday: userFields.birthday.toLocaleDateString(),
        email: userFields.email,
        phone: userFields.phone,
        personalDiscount: userFields.personal_discount,
      });
      userList.push(user);
    }

    return userList;
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

  async getUserOrderList(userId: number): Promise<Array<OrderEntity>> {
    const res = await this.conn.query(
      `SELECT * FROM "order" o
       WHERE o.user_id = $1`,
      [userId]
    );
    let orderList: Array<OrderEntity> = [];
    for (let orderFields of res.rows) {
      orderList.push(
        new OrderEntity({
          id: orderFields.id,
          userId: orderFields.user_id,
          companyId: orderFields.company_id,
          statusId: orderFields.status_id,
          createdAt: orderFields.created_at,
          completedAt: orderFields.completed_at,
          shopId: orderFields.shop_id,
          price: orderFields.price,
        })
      );
    }
    return orderList;
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
