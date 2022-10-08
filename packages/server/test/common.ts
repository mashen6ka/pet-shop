import { Client } from "pg";
export function connectDB(user: string, password: string) {
  const pgConfig = {
    host: "localhost",
    port: 9999,
    user: user,
    password: password,
    database: "main",
  };
  const pgClient = new Client(pgConfig);

  pgClient.connect((err) => {
    if (err) {
      console.error(`Failed to connect to DB as ${user}`, err.stack);
    } else {
      console.log(`Connected to DB as ${user}`);
    }
  });

  return pgClient;
}
