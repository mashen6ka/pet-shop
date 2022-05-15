const { migrate } = require("postgres-migrations");

async function main() {
  const dbConfig = {
    database: "main",
    user: "postgres",
    password: "postgres",
    host: "localhost",
    port: 9999,
    ensureDatabaseExists: true,
    defaultDatabase: "postgres",
  };

  await migrate(dbConfig, "./migrations");
}

main();
