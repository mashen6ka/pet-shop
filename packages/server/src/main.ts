import "reflect-metadata";
import express from "express";
import { Client } from "pg";
import { ClientController, ProductController } from "./controller";
import { PgClientRepo, PgProductRepo } from "./repository";
import { ClientService, ProductService } from "./service";
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

const productRepo = new PgProductRepo(pgClient);
const productService = new ProductService(productRepo);
const productController = new ProductController(productService);

app.post("/product/create", (req, res) => {
  console.log(req.body);
  productController.createProduct(req, res);
});

app.post("/product/update", (req, res) => {
  console.log(req.body);
  productController.updateProduct(req, res);
});

app.post("/product/delete", (req, res) => {
  console.log(req.body);
  productController.deleteProduct(req, res);
});

app.post("/product/get", (req, res) => {
  console.log(req.body);
  productController.getProduct(req, res);
});

app.listen(port);
console.log(`App started. Listening to port ${port}`);
