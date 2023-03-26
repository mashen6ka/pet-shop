import "reflect-metadata";
import express from "express";
import cookieParser from "cookie-parser";
import { Client as PgClient } from "pg";
import log from "npmlog";
import { Request } from "express";
import fs from "fs";
import dotenv from "dotenv";
import path from "path";
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
import { logLevel } from "./config";
import * as swaggerUI from "swagger-ui-express";
import swaggerDoc from "./openapi.json";

dotenv.config({
  path: path.join(__dirname, "..", ".env." + process.env.ENV),
});

log.stream = fs.createWriteStream("../log.txt", { flags: "a" });
log.level = logLevel;
const port = 3000;
const app = express();
app.use(express.json());
app.use(cookieParser());
// app.use("/img", express.static("../generator/img"));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://pet-shop.test");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Set-Cookie"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Server", "mashenka");
  next();
});
app.use("/", (req, res, next) => {
  if (process.env.HTTP_BASE_PATH) {
    req.url.replace(`${process.env.HTTP_BASE_PATH}`, "");
  }
  next();
});

const conn = connectDB();

const userRepo = new PgUserRepo(conn as PgClient);
const authService = new AuthService(userRepo);
const userService = new UserService(userRepo);
const userController = new UserController(authService, userService);

app.get("/api/v1/version", (req, res) => {
  logRequest(req);
  res.json({ version: process.env.VERSION });
});

app.post("/api/v1/user/authn", (req, res) => {
  logRequest(req);
  userController.authenticateUser(req, res);
});

app.post("/api/v1/user", (req, res) => {
  logRequest(req);
  userController.createUser(req, res);
});

app.patch("/api/v1/user", (req, res) => {
  logRequest(req);
  userController.updateUser(req, res);
});

app.delete("/api/v1/users/:id", (req, res) => {
  logRequest(req);
  userController.deleteUser(req, res);
});

app.get("/api/v1/user", (req, res) => {
  logRequest(req);
  userController.getUser(req, res);
});

app.get("/api/v1/users", (req, res) => {
  logRequest(req);
  userController.getUserList(req, res);
});

app.get("/api/v1/user/companies", (req, res) => {
  logRequest(req);
  userController.getUserCompanyList(req, res);
});

app.get("/api/v1/user/orders", (req, res) => {
  logRequest(req);
  userController.getUserOrderList(req, res);
});

app.post("/api/v1/user/companies", (req, res) => {
  logRequest(req);
  userController.createUserCompany(req, res);
});

app.delete("/api/v1/user/companies/:companyId", (req, res) => {
  logRequest(req);
  userController.deleteUserCompany(req, res);
});

const productRepo = new PgProductRepo(conn as PgClient);
const productService = new ProductService(productRepo);
const productController = new ProductController(authService, productService);

app.post("/api/v1/products", (req, res) => {
  logRequest(req);
  productController.createProduct(req, res);
});

app.put("/api/v1/products/:id", (req, res) => {
  logRequest(req);
  productController.updateProduct(req, res);
});

app.delete("/api/v1/products/:id", (req, res) => {
  logRequest(req);
  productController.deleteProduct(req, res);
});

app.get("/api/v1/products/:id", (req, res) => {
  logRequest(req);
  productController.getProduct(req, res);
});

app.get("/api/v1/products", (req, res) => {
  logRequest(req);
  productController.getProductList(req, res);
});

app.get("/api/v1/products/:productId/shops", (req, res) => {
  logRequest(req);
  productController.getProductShopList(req, res);
});

const shopRepo = new PgShopRepo(conn);
const shopService = new ShopService(shopRepo);
const shopController = new ShopController(authService, shopService);

app.post("/api/v1/shops", (req, res) => {
  logRequest(req);
  shopController.createShop(req, res);
});

app.put("/api/v1/shops/:id", (req, res) => {
  logRequest(req);
  shopController.updateShop(req, res);
});

app.delete("/api/v1/shops/:id", (req, res) => {
  logRequest(req);
  shopController.deleteShop(req, res);
});

app.get("/api/v1/shops/:id", (req, res) => {
  logRequest(req);
  shopController.getShop(req, res);
});

app.get("/api/v1/shops", (req, res) => {
  logRequest(req);
  shopController.getShopList(req, res);
});

const companyRepo = new PgCompanyRepo(conn);
const companyService = new CompanyService(companyRepo);
const companyController = new CompanyController(authService, companyService);

app.post("/api/v1/companies", (req, res) => {
  logRequest(req);
  companyController.createCompany(req, res);
});

app.put("/api/v1/companies/:id", (req, res) => {
  logRequest(req);
  companyController.updateCompany(req, res);
});

app.delete("/api/v1/companies/:id", (req, res) => {
  logRequest(req);
  companyController.deleteCompany(req, res);
});

app.get("/api/v1/companies/:id", (req, res) => {
  logRequest(req);
  companyController.getCompany(req, res);
});

app.get("/api/v1/companies", (req, res) => {
  logRequest(req);
  companyController.getCompanyList(req, res);
});

const orderRepo = new PgOrderRepo(conn as PgClient);
const orderService = new OrderService(orderRepo);
const orderController = new OrderController(authService, orderService);

app.post("/api/v1/orders", (req, res) => {
  logRequest(req);
  orderController.createOrder(req, res);
});

app.put("/api/v1/orders/:id", (req, res) => {
  logRequest(req);
  orderController.updateOrder(req, res);
});

app.delete("/api/v1/orders/:id", (req, res) => {
  logRequest(req);
  orderController.deleteOrder(req, res);
});

app.get("/api/v1/orders/:id", (req, res) => {
  logRequest(req);
  orderController.getOrder(req, res);
});

app.get("/api/v1/orders", (req, res) => {
  logRequest(req);
  orderController.getOrderList(req, res);
});

app.post("/api/v1/orders/:orderId/items/:productId", (req, res) => {
  logRequest(req);
  orderController.createOrderItem(req, res);
});

app.delete("/api/v1/orders/:orderId/items/:productId", (req, res) => {
  logRequest(req);
  orderController.deleteOrderItem(req, res);
});

app.put("/api/v1/orders/:orderId/items/:productId", (req, res) => {
  logRequest(req);
  orderController.updateOrderItem(req, res);
});

app.get("/api/v1/orders/:orderId/items", (req, res) => {
  logRequest(req);
  orderController.getOrderItemList(req, res);
});

const manufacturerRepo = new PgManufacturerRepo(conn);
const manufacturerService = new ManufacturerService(manufacturerRepo);
const manufacturerController = new ManufacturerController(
  authService,
  manufacturerService
);

app.post("/api/v1/manufacturers", (req, res) => {
  logRequest(req);
  manufacturerController.createManufacturer(req, res);
});

app.put("/api/v1/manufacturers/:id", (req, res) => {
  logRequest(req);
  manufacturerController.updateManufacturer(req, res);
});

app.delete("/api/v1/manufacturers/:id", (req, res) => {
  logRequest(req);
  manufacturerController.deleteManufacturer(req, res);
});

app.get("/api/v1/manufacturers/:id", (req, res) => {
  logRequest(req);
  manufacturerController.getManufacturer(req, res);
});

app.get("/api/v1/manufacturers", (req, res) => {
  logRequest(req);
  manufacturerController.getManufacturerList(req, res);
});

const countryRepo = new PgCountryRepo(conn);
const countryService = new CountryService(countryRepo);
const countryController = new CountryController(authService, countryService);

app.post("/api/v1/countries", (req, res) => {
  logRequest(req);
  countryController.createCountry(req, res);
});

app.put("/api/v1/countries/:id", (req, res) => {
  logRequest(req);
  countryController.updateCountry(req, res);
});

app.delete("/api/v1/countries/:id", (req, res) => {
  logRequest(req);
  countryController.deleteCountry(req, res);
});

app.get("/api/v1/countries/:id", (req, res) => {
  logRequest(req);
  countryController.getCountry(req, res);
});

app.get("/api/v1/countries", (req, res) => {
  logRequest(req);
  countryController.getCountryList(req, res);
});

const orderStatusRepo = new PgOrderStatusRepo(conn);
const orderStatusService = new OrderStatusService(orderStatusRepo);
const orderStatusController = new OrderStatusController(
  authService,
  orderStatusService
);

app.post("/api/v1/statuses", (req, res) => {
  logRequest(req);
  orderStatusController.createOrderStatus(req, res);
});

app.put("/api/v1/statuses/:id", (req, res) => {
  logRequest(req);
  orderStatusController.updateOrderStatus(req, res);
});

app.delete("/api/v1/statuses/:id", (req, res) => {
  logRequest(req);
  orderStatusController.deleteOrderStatus(req, res);
});

app.get("/api/v1/statuses/:id", (req, res) => {
  logRequest(req);
  orderStatusController.getOrderStatus(req, res);
});

app.get("/api/v1/statuses", (req, res) => {
  logRequest(req);
  orderStatusController.getOrderStatusList(req, res);
});

app.use("/api/v1", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.listen(port);
console.log(`App started. Listening to port ${port}`);

function logRequest(req: Request) {
  const info =
    `dateTime: ${new Date().toLocaleString()} ` +
    `path: ${JSON.stringify(req.route.path)} ` +
    `body: ${JSON.stringify(req.body)} ` +
    `query: ${JSON.stringify(req.query)} ` +
    `cookies: ${JSON.stringify(req.cookies)} ` +
    `params: ${JSON.stringify(req.params)} ` +
    `headers: ${JSON.stringify(req.headers)} `;
  console.log(info);
  log.info("req", info);
}

function connectDB() {
  const pgClient = new PgClient({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  pgClient.connect((err) => {
    if (err) console.error(`Failed to connect to DB`, err.stack);
    else console.log(`Connected to DB`);
  });

  return pgClient;
}
