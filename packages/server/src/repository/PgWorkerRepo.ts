import { WorkerEntity } from "../entity";
import IWorkerRepo from "./IWorkerRepo";
import { Client as pgConn } from "pg";

export default class PgWorkerRepo implements IWorkerRepo {
  private conn: pgConn;

  constructor(conn: pgConn) {
    this.conn = conn;
  }

  async createWorker(worker: WorkerEntity): Promise<Number> {
    console.log(worker);
    const res = await this.conn.query(
      `INSERT INTO worker (login, password, first_name, last_name, 
       middle_name, birthday, email, phone, passport_series, 
       passport_num, "INN", job_id, shop_id) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
       RETURNING id`,
      [
        worker.login,
        worker.password,
        worker.firstName,
        worker.lastName,
        worker.middleName,
        worker.birthday,
        worker.email,
        worker.phone,
        worker.passportSeries,
        worker.passportNum,
        worker.INN,
        worker.jobId,
        worker.shopId,
      ]
    );
    return res?.rows?.[0]?.id;
  }

  async updateWorker(worker: WorkerEntity): Promise<void> {
    await this.conn.query(
      `UPDATE worker SET (login, password, first_name, last_name, 
        middle_name, birthday, email, phone, passport_series, 
        passport_num, "INN", job_id, shop_id) 
       = ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
       WHERE id = $14`,
      [
        worker.login,
        worker.password,
        worker.firstName,
        worker.lastName,
        worker.middleName,
        worker.birthday,
        worker.email,
        worker.phone,
        worker.passportSeries,
        worker.passportNum,
        worker.INN,
        worker.jobId,
        worker.shopId,
        worker.id,
      ]
    );
  }

  async deleteWorker(id: number): Promise<void> {
    await this.conn.query(
      `DELETE FROM worker
       WHERE id = $1`,
      [id]
    );
  }

  async getWorker(id: number): Promise<WorkerEntity> {
    const res = await this.conn.query(
      `SELECT * from worker
       WHERE id = $1`,
      [id]
    );
    const worker = new WorkerEntity(res.rows[0]);

    return worker;
  }
}
