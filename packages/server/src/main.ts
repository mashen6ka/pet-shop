import "reflect-metadata";
import express from "express";
import { Client } from "pg";
import {
  ClientController,
  ProductController,
  WorkerController,
  ShopController,
  CompanyController,
  OrderController,
} from "./controller";
import {
  PgClientRepo,
  PgProductRepo,
  PgWorkerRepo,
  PgShopRepo,
  PgCompanyRepo,
  PgOrderRepo,
} from "./repository";
import {
  ClientService,
  ProductService,
  WorkerService,
  ShopService,
  CompanyService,
  OrderService,
} from "./service";
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

const workerRepo = new PgWorkerRepo(pgClient);
const workerService = new WorkerService(workerRepo);
const workerController = new WorkerController(workerService);

app.post("/worker/create", (req, res) => {
  console.log(req.body);
  workerController.createWorker(req, res);
});

app.post("/worker/update", (req, res) => {
  console.log(req.body);
  workerController.updateWorker(req, res);
});

app.post("/worker/delete", (req, res) => {
  console.log(req.body);
  workerController.deleteWorker(req, res);
});

app.post("/worker/get", (req, res) => {
  console.log(req.body);
  workerController.getWorker(req, res);
});

const shopRepo = new PgShopRepo(pgClient);
const shopService = new ShopService(shopRepo);
const shopController = new ShopController(shopService);

app.post("/shop/create", (req, res) => {
  console.log(req.body);
  shopController.createShop(req, res);
});

app.post("/shop/update", (req, res) => {
  console.log(req.body);
  shopController.updateShop(req, res);
});

app.post("/shop/delete", (req, res) => {
  console.log(req.body);
  shopController.deleteShop(req, res);
});

app.post("/shop/get", (req, res) => {
  console.log(req.body);
  shopController.getShop(req, res);
});

app.post("/shop/get/list", (req, res) => {
  console.log(req.body);
  shopController.getShopList(req, res);
});

const companyRepo = new PgCompanyRepo(pgClient);
const companyService = new CompanyService(companyRepo);
const companyController = new CompanyController(companyService);

app.post("/company/create", (req, res) => {
  console.log(req.body);
  companyController.createCompany(req, res);
});

app.post("/company/update", (req, res) => {
  console.log(req.body);
  companyController.updateCompany(req, res);
});

app.post("/company/delete", (req, res) => {
  console.log(req.body);
  companyController.deleteCompany(req, res);
});

app.post("/company/get", (req, res) => {
  console.log(req.body);
  companyController.getCompany(req, res);
});

const orderRepo = new PgOrderRepo(pgClient);
const orderService = new OrderService(orderRepo);
const orderController = new OrderController(orderService);

app.post("/order/create", (req, res) => {
  console.log(req.body);
  orderController.createOrder(req, res);
});

app.post("/order/update", (req, res) => {
  console.log(req.body);
  orderController.updateOrder(req, res);
});

app.post("/order/delete", (req, res) => {
  console.log(req.body);
  orderController.deleteOrder(req, res);
});

app.post("/order/get", (req, res) => {
  console.log(req.body);
  orderController.getOrder(req, res);
});

app.post("/order/create/product", (req, res) => {
  console.log(req.body);
  orderController.createOrderProduct(req, res);
});

app.post("/order/delete/product", (req, res) => {
  console.log(req.body);
  orderController.deleteOrderProduct(req, res);
});

app.post("/order/update/product", (req, res) => {
  console.log(req.body);
  orderController.updateOrderProduct(req, res);
});

app.listen(port);
console.log(`App started. Listening to port ${port}`);
