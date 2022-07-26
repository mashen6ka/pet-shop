import "reflect-metadata";
import express from "express";
import { Client } from "pg";
import { ClientController } from "./controller";
import { PgClientRepo } from "./repository";
import { ClientService } from "./service";
// import bodyParser from "body-parser";

const port = 3000;
const app = express();
app.use(express.json());

// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );

const pgConfig = {
  host: "localhost",
  port: 9999,
  user: "postgres",
  password: "postgres",
  database: "main",
};
const pgClient = new Client(pgConfig);

pgClient.connect((err) => {
  if (err) {
    console.error("Failed to connect to DB", err.stack);
  } else {
    console.log("Connected to DB");
  }
});

const clientRepo = new PgClientRepo(pgClient);
const clientService = new ClientService(clientRepo);
const clientController = new ClientController(clientService);

app.post("/client/create", (req, res) => {
  console.log(req.body);
  clientController.createClient(req, res);
});

app.post("/client/update", (req, res) => {
  console.log(req.body);
  clientController.updateClient(req, res);
});

app.post("/client/delete", (req, res) => {
  console.log(req.body);
  clientController.deleteClient(req, res);
});

app.post("/client/get", (req, res) => {
  console.log(req.body);
  clientController.getClient(req, res);
});

app.listen(port);
console.log(`App started. Listening to port ${port}`);
