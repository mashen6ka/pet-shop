import "reflect-metadata";
import express from "express";
import cookieParser from "cookie-parser";
import { Client } from "pg";
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

// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );

const connClient = connectDB("client", "sf2nce3");
const connWorker = connectDB("worker", "1gjg5cjk");
const connAdmin = connectDB("admin", "2jk493hs");
const connMashenka = connectDB("postgres", "postgres");

const userRepo = new PgUserRepo(connClient, connWorker);
const authService = new AuthService(userRepo);
const userService = new UserService(userRepo);
const userController = new UserController(authService, userService);

app.post("/user/authn", (req, res) => {
  console.log(req.body);
  userController.authenticateUser(req, res);
});

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

// занулять пароль
app.post("/user/get", (req, res) => {
  console.log(req.body);
  userController.getUser(req, res);
});

app.post("/user/get/list", (req, res) => {
  console.log(req.body);
  userController.getUserList(req, res);
});

app.post("/user/get/company/list", (req, res) => {
  console.log(req.body);
  userController.getUserCompanyList(req, res);
});

app.post("/user/get/order/list", (req, res) => {
  console.log(req.body);
  userController.getUserOrderList(req, res);
});

app.post("/user/create/company", (req, res) => {
  console.log(req.body);
  userController.createUserCompany(req, res);
});

app.post("/user/delete/company", (req, res) => {
  console.log(req.body);
  userController.deleteUserCompany(req, res);
});

const productRepo = new PgProductRepo(connClient, connAdmin);
const productService = new ProductService(productRepo);
const productController = new ProductController(authService, productService);

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

app.post("/product/get/list", (req, res) => {
  console.log(req.body);
  productController.getProductList(req, res);
});

app.post("/product/get/shop/list", (req, res) => {
  console.log(req.body);
  productController.getProductShopList(req, res);
});

const shopRepo = new PgShopRepo(connClient, connAdmin);
const shopService = new ShopService(shopRepo);
const shopController = new ShopController(authService, shopService);

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

const companyRepo = new PgCompanyRepo(connWorker);
const companyService = new CompanyService(companyRepo);
const companyController = new CompanyController(authService, companyService);

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

app.post("/company/get/list", (req, res) => {
  console.log(req.body);
  companyController.getCompanyList(req, res);
});

const orderRepo = new PgOrderRepo(connClient, connWorker);
const orderService = new OrderService(orderRepo);
const orderController = new OrderController(authService, orderService);

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

app.post("/order/get/list", (req, res) => {
  console.log(req.body);
  orderController.getOrderList(req, res);
});

app.post("/order/create/item", (req, res) => {
  console.log(req.body);
  orderController.createOrderItem(req, res);
});

app.post("/order/delete/item", (req, res) => {
  console.log(req.body);
  orderController.deleteOrderItem(req, res);
});

app.post("/order/update/item", (req, res) => {
  console.log(req.body);
  orderController.updateOrderItem(req, res);
});

app.post("/order/get/item/list", (req, res) => {
  console.log(req.body);
  orderController.getOrderItemList(req, res);
});

const manufacturerRepo = new PgManufacturerRepo(connAdmin);
const manufacturerService = new ManufacturerService(manufacturerRepo);
const manufacturerController = new ManufacturerController(
  authService,
  manufacturerService
);

app.post("/manufacturer/create", (req, res) => {
  console.log(req.body);
  manufacturerController.createManufacturer(req, res);
});

app.post("/manufacturer/update", (req, res) => {
  console.log(req.body);
  manufacturerController.updateManufacturer(req, res);
});

app.post("/manufacturer/delete", (req, res) => {
  console.log(req.body);
  manufacturerController.deleteManufacturer(req, res);
});

app.post("/manufacturer/get", (req, res) => {
  console.log(req.body);
  manufacturerController.getManufacturer(req, res);
});

app.post("/manufacturer/get/list", (req, res) => {
  console.log(req.body);
  manufacturerController.getManufacturerList(req, res);
});

const countryRepo = new PgCountryRepo(connAdmin);
const countryService = new CountryService(countryRepo);
const countryController = new CountryController(authService, countryService);

app.post("/country/create", (req, res) => {
  console.log(req.body);
  countryController.createCountry(req, res);
});

app.post("/country/update", (req, res) => {
  console.log(req.body);
  countryController.updateCountry(req, res);
});

app.post("/country/delete", (req, res) => {
  console.log(req.body);
  countryController.deleteCountry(req, res);
});

app.post("/country/get", (req, res) => {
  console.log(req.body);
  countryController.getCountry(req, res);
});

app.post("/country/get/list", (req, res) => {
  console.log(req.body);
  countryController.getCountryList(req, res);
});

const orderStatusRepo = new PgOrderStatusRepo(connAdmin);
const orderStatusService = new OrderStatusService(orderStatusRepo);
const orderStatusController = new OrderStatusController(
  authService,
  orderStatusService
);

app.post("/order/status/create", (req, res) => {
  console.log(req.body);
  orderStatusController.createOrderStatus(req, res);
});

app.post("/order/status/update", (req, res) => {
  console.log(req.body);
  orderStatusController.updateOrderStatus(req, res);
});

app.post("/order/status/delete", (req, res) => {
  console.log(req.body);
  orderStatusController.deleteOrderStatus(req, res);
});

app.post("/order/status/get", (req, res) => {
  console.log(req.body);
  orderStatusController.getOrderStatus(req, res);
});

app.post("/order/status/get/list", (req, res) => {
  console.log(req.body);
  orderStatusController.getOrderStatusList(req, res);
});

app.listen(port);
console.log(`App started. Listening to port ${port}`);

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

async function testIndex() {
  // await connWorker.query(`drop index if exists password_idx`, []);

  // await connWorker.query(`CREATE INDEX password_idx on "user" (password);`, []);

  const iter = 10000;
  let time = 0;
  for (let i = 0; i < iter; i += 1) {
    const res: any = await connMashenka.query(
      `explain analyze SELECT o.id
       FROM "order" o
       WHERE o.status_id = 1`,
      []
    );
    const execTimeStr = res?.rows?.pop()["QUERY PLAN"].split(" ")[2];
    const planTimeStr = res?.rows?.pop()["QUERY PLAN"].split(" ")[2];
    const planTime = parseFloat(planTimeStr);
    const execTime = parseFloat(execTimeStr);
    // time += planTime + execTime;
    time += execTime;
  }
  console.log("avg: ", time / iter);
  // console.log(res?.rows?.[4]);
}
