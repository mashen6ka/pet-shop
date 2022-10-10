export const cookieName = "PET-SHOP";
export const logLevel = "info"; // 'error' or 'info'
export const dbType = "postgres"; // 'mongo' or 'postgres'

export const dbCredentials = {
  postgres: {
    config: {
      host: "localhost",
      port: 9999,
      user: "postgres",
      password: "postgres",
      database: "main",
    },
  },
  mongo: {
    config: {
      host: "localhost",
      port: 27017,
      user: "mongo",
      password: "mongo",
      database: "main",
    },
  },
};
