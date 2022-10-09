import "reflect-metadata";
import express from "express";
import cookieParser from "cookie-parser";
import { Client } from "pg";
import { MongoClient } from "mongodb";
import log from "npmlog";
import { Request } from "express";
import fs from "fs";
import {
  UserController,
  ProductController,
  ShopController,
  CompanyController,
  OrderController,
  ManufacturerController,
  CountryController,
  OrderStatusController,
} from "./controller";
import {
  PgUserRepo,
  PgProductRepo,
  PgShopRepo,
  PgCompanyRepo,
  PgOrderRepo,
  PgManufacturerRepo,
  PgCountryRepo,
  PgOrderStatusRepo,
} from "./repository";
import {
  UserService,
  ProductService,
  ShopService,
  CompanyService,
  OrderService,
  ManufacturerService,
  CountryService,
  OrderStatusService,
  AuthService,
} from "./service";
// import bodyParser from "body-parser";
log.stream = fs.createWriteStream("../log.txt", { flags: "a" });
const port = 3000;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/img", express.static("../generator/img"));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Set-Cookie"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

const conn = connectDB("postgres", "postgres");
// const connMongo

const userRepo = new PgUserRepo(conn);
const authService = new AuthService(userRepo);
const userService = new UserService(userRepo);
const userController = new UserController(authService, userService);

app.post("/user/authn", (req, res) => {
  logRequest(req);
  userController.authenticateUser(req, res);
});

app.post("/user/create", (req, res) => {
  logRequest(req);
  userController.createUser(req, res);
});

app.post("/user/update", (req, res) => {
  logRequest(req);
  userController.updateUser(req, res);
});

app.post("/user/delete", (req, res) => {
  logRequest(req);
  userController.deleteUser(req, res);
});

app.get("/user/get", (req, res) => {
  logRequest(req);
  userController.getUser(req, res);
});

app.get("/user/get/list", (req, res) => {
  logRequest(req);
  userController.getUserList(req, res);
});

app.get("/user/get/company/list", (req, res) => {
  logRequest(req);
  userController.getUserCompanyList(req, res);
});

app.get("/user/get/order/list", (req, res) => {
  logRequest(req);
  userController.getUserOrderList(req, res);
});

app.post("/user/create/company", (req, res) => {
  logRequest(req);
  userController.createUserCompany(req, res);
});

app.post("/user/delete/company", (req, res) => {
  logRequest(req);
  userController.deleteUserCompany(req, res);
});

const productRepo = new PgProductRepo(conn);
const productService = new ProductService(productRepo);
const productController = new ProductController(authService, productService);

app.post("/product/create", (req, res) => {
  logRequest(req);
  productController.createProduct(req, res);
});

app.post("/product/update", (req, res) => {
  logRequest(req);
  productController.updateProduct(req, res);
});

app.post("/product/delete", (req, res) => {
  logRequest(req);
  productController.deleteProduct(req, res);
});

app.get("/product/get", (req, res) => {
  logRequest(req);
  productController.getProduct(req, res);
});

app.get("/product/get/list", (req, res) => {
  logRequest(req);
  productController.getProductList(req, res);
});

app.get("/product/get/shop/list", (req, res) => {
  logRequest(req);
  productController.getProductShopList(req, res);
});

const shopRepo = new PgShopRepo(conn);
const shopService = new ShopService(shopRepo);
const shopController = new ShopController(authService, shopService);

app.post("/shop/create", (req, res) => {
  logRequest(req);
  shopController.createShop(req, res);
});

app.post("/shop/update", (req, res) => {
  logRequest(req);
  shopController.updateShop(req, res);
});

app.post("/shop/delete", (req, res) => {
  logRequest(req);
  shopController.deleteShop(req, res);
});

app.get("/shop/get", (req, res) => {
  logRequest(req);
  shopController.getShop(req, res);
});

app.get("/shop/get/list", (req, res) => {
  logRequest(req);
  shopController.getShopList(req, res);
});

const companyRepo = new PgCompanyRepo(conn);
const companyService = new CompanyService(companyRepo);
const companyController = new CompanyController(authService, companyService);

app.post("/company/create", (req, res) => {
  logRequest(req);
  companyController.createCompany(req, res);
});

app.post("/company/update", (req, res) => {
  logRequest(req);
  companyController.updateCompany(req, res);
});

app.post("/company/delete", (req, res) => {
  logRequest(req);
  companyController.deleteCompany(req, res);
});

app.get("/company/get", (req, res) => {
  logRequest(req);
  companyController.getCompany(req, res);
});

app.get("/company/get/list", (req, res) => {
  logRequest(req);
  companyController.getCompanyList(req, res);
});

const orderRepo = new PgOrderRepo(conn);
const orderService = new OrderService(orderRepo);
const orderController = new OrderController(authService, orderService);

app.post("/order/create", (req, res) => {
  logRequest(req);
  orderController.createOrder(req, res);
});

app.post("/order/update", (req, res) => {
  logRequest(req);
  orderController.updateOrder(req, res);
});

app.post("/order/delete", (req, res) => {
  logRequest(req);
  orderController.deleteOrder(req, res);
});

app.get("/order/get", (req, res) => {
  logRequest(req);
  orderController.getOrder(req, res);
});

app.get("/order/get/list", (req, res) => {
  logRequest(req);
  orderController.getOrderList(req, res);
});

app.post("/order/create/item", (req, res) => {
  logRequest(req);
  orderController.createOrderItem(req, res);
});

app.post("/order/delete/item", (req, res) => {
  logRequest(req);
  orderController.deleteOrderItem(req, res);
});

app.post("/order/update/item", (req, res) => {
  logRequest(req);
  orderController.updateOrderItem(req, res);
});

app.get("/order/get/item/list", (req, res) => {
  logRequest(req);
  orderController.getOrderItemList(req, res);
});

const manufacturerRepo = new PgManufacturerRepo(conn);
const manufacturerService = new ManufacturerService(manufacturerRepo);
const manufacturerController = new ManufacturerController(
  authService,
  manufacturerService
);

app.post("/manufacturer/create", (req, res) => {
  logRequest(req);
  manufacturerController.createManufacturer(req, res);
});

app.post("/manufacturer/update", (req, res) => {
  logRequest(req);
  manufacturerController.updateManufacturer(req, res);
});

app.post("/manufacturer/delete", (req, res) => {
  logRequest(req);
  manufacturerController.deleteManufacturer(req, res);
});

app.get("/manufacturer/get", (req, res) => {
  logRequest(req);
  manufacturerController.getManufacturer(req, res);
});

app.get("/manufacturer/get/list", (req, res) => {
  logRequest(req);
  manufacturerController.getManufacturerList(req, res);
});

const countryRepo = new PgCountryRepo(conn);
const countryService = new CountryService(countryRepo);
const countryController = new CountryController(authService, countryService);

app.post("/country/create", (req, res) => {
  logRequest(req);
  countryController.createCountry(req, res);
});

app.post("/country/update", (req, res) => {
  logRequest(req);
  countryController.updateCountry(req, res);
});

app.post("/country/delete", (req, res) => {
  logRequest(req);
  countryController.deleteCountry(req, res);
});

app.get("/country/get", (req, res) => {
  logRequest(req);
  countryController.getCountry(req, res);
});

app.get("/country/get/list", (req, res) => {
  logRequest(req);
  countryController.getCountryList(req, res);
});

const orderStatusRepo = new PgOrderStatusRepo(conn);
const orderStatusService = new OrderStatusService(orderStatusRepo);
const orderStatusController = new OrderStatusController(
  authService,
  orderStatusService
);

app.post("/order/status/create", (req, res) => {
  logRequest(req);
  orderStatusController.createOrderStatus(req, res);
});

app.post("/order/status/update", (req, res) => {
  logRequest(req);
  orderStatusController.updateOrderStatus(req, res);
});

app.post("/order/status/delete", (req, res) => {
  logRequest(req);
  orderStatusController.deleteOrderStatus(req, res);
});

app.get("/order/status/get", (req, res) => {
  logRequest(req);
  orderStatusController.getOrderStatus(req, res);
});

app.get("/order/status/get/list", (req, res) => {
  logRequest(req);
  orderStatusController.getOrderStatusList(req, res);
});

app.listen(port);
console.log(`App started. Listening to port ${port}`);

function logRequest(req: Request) {
  log.info(
    "req",
    `dateTime: ${new Date().toLocaleString()}`,
    `path: ${JSON.stringify(req.route.path)}`,
    `body: ${JSON.stringify(req.body)}`,
    `query: ${JSON.stringify(req.query)}`,
    `cookies: ${JSON.stringify(req.cookies)}`
  );
}

function connectDB(user: string, password: string) {
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
