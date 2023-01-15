import dotenv from "dotenv";
import path from "path";
import { Client as PgClient } from "pg";

dotenv.config({
  path: path.join(__dirname, "..", ".env." + process.env.ENV),
});

export default function connectDB(): Promise<PgClient> {
  return new Promise((resolve, reject) => {
    const pgClient = new PgClient({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
    pgClient.connect((err) => {
      if (err) {
        reject(err);
      } else {
        resolve(pgClient);
      }
    });
  });
}
