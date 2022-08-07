import "reflect-metadata";
import express from "express";
import { Client } from "pg";
import {
  UserController,
  ProductController,
  ShopController,
  CompanyController,
  OrderController,
} from "./controller";
import {
  PgUserRepo,
  PgProductRepo,
  PgShopRepo,
  PgCompanyRepo,
  PgOrderRepo,
} from "./repository";
import {
  UserService,
  ProductService,
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

const userRepo = new PgUserRepo(pgClient);
const userService = new UserService(userRepo);
const userController = new UserController(userService);

app.post("/user/create", (req, res) => {
  console.log(req.body);
  userController.createUser(req, res);
});

app.post("/user/update", (req, res) => {
  console.log(req.body);
  userController.updateUser(req, res);
});

app.post("/user/delete", (req, res) => {
  console.log(req.body);
  userController.deleteUser(req, res);
});

app.post("/user/get", (req, res) => {
  console.log(req.body);
  userController.getUser(req, res);
});

app.post("/user/get/company/list", (req, res) => {
  console.log(req.body);
  userController.getUserCompanyList(req, res);
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

// const orderRepo = new PgOrderRepo(pgClient);
// const orderService = new OrderService(orderRepo);
// const orderController = new OrderController(orderService);

// app.post("/order/create", (req, res) => {
//   console.log(req.body);
//   orderController.createOrder(req, res);
// });

// app.post("/order/update", (req, res) => {
//   console.log(req.body);
//   orderController.updateOrder(req, res);
// });

// app.post("/order/delete", (req, res) => {
//   console.log(req.body);
//   orderController.deleteOrder(req, res);
// });

// app.post("/order/get", (req, res) => {
//   console.log(req.body);
//   orderController.getOrder(req, res);
// });

// app.post("/order/create/product", (req, res) => {
//   console.log(req.body);
//   orderController.createOrderProduct(req, res);
// });

// app.post("/order/delete/product", (req, res) => {
//   console.log(req.body);
//   orderController.deleteOrderProduct(req, res);
// });

// app.post("/order/update/product", (req, res) => {
//   console.log(req.body);
//   orderController.updateOrderProduct(req, res);
// });

app.listen(port);
console.log(`App started. Listening to port ${port}`);
