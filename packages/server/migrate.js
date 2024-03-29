const { migrate } = require("postgres-migrations");

async function main() {
  const dbConfig = {
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    ensureDatabaseExists: true,
  };

  await migrate(dbConfig, "./migrations");
}

main();
