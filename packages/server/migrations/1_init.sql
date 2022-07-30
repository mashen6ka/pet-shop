CREATE TABLE "worker" (
  "id" SERIAL PRIMARY KEY,
  "login" varchar(32) UNIQUE NOT NULL,
  "password" varchar(32) NOT NULL,
  "first_name" varchar(32) NOT NULL,
  "last_name" varchar(32) NOT NULL,
  "middle_name" varchar(32),
  "birthday" date,
  "email" varchar(512) UNIQUE NOT NULL,
  "phone" varchar(16),
  "passport_series" varchar(4) NOT NULL,
  "passport_num" varchar(6) NOT NULL,
  "INN" varchar(12) NOT NULL,
  "job_id" int NOT NULL,
  "shop_id" int NOT NULL
);

CREATE TABLE "job" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(32) NOT NULL
);

CREATE TABLE "shop" (
  "id" SERIAL PRIMARY KEY,
  "address" text NOT NULL,
  "working_hours" jsonb NOT NULL
);

CREATE TABLE "client" (
  "id" SERIAL PRIMARY KEY,
  "login" varchar(32) UNIQUE NOT NULL,
  "password" varchar(32) NOT NULL,
  "first_name" varchar(32) NOT NULL,
  "last_name" varchar(32) NOT NULL,
  "middle_name" varchar(32),
  "birthday" date,
  "email" varchar(512) UNIQUE NOT NULL,
  "phone" varchar(16),
  "personal_discount" int NOT NULL DEFAULT 0 CHECK(personal_discount >= 0 AND  personal_discount <= 100)
);

CREATE TABLE "company" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(128) NOT NULL,
  "KPP" varchar(9) NOT NULL,
  "INN" varchar(12) NOT NULL,
  "address" text NOT NULL
);

CREATE TABLE "client_company" (
  "client_id" int NOT NULL,
  "company_id" int NOT NULL
);

CREATE TABLE "product" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(128) NOT NULL,
  "description" text NOT NULL,
  "country_id" int NOT NULL,
  "initial_price" int NOT NULL,
  "discount" int NOT NULL DEFAULT 0 CHECK(discount >= 0 AND  discount <= 100)
);

CREATE TABLE "product_shop" (
  "product_id" int NOT NULL,
  "shop_id" int NOT NULL,
  "quantity" int NOT NULL
);

CREATE TABLE "country" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(32) NOT NULL
);

CREATE TABLE "order" (
  "id" SERIAL PRIMARY KEY,
  "client_id" int NOT NULL,
  "company_id" int,
  "status_id" int NOT NULL,
  "created_at" timestamp DEFAULT LOCALTIMESTAMP,
  "completed_at" timestamp,
  "shop_id" int NOT NULL,
  "price" int NOT NULL
);

CREATE TABLE "order_status" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(32) NOT NULL
);

CREATE TABLE "order_items" (
  "order_id" int NOT NULL,
  "product_id" int NOT NULL,
  "quantity" int NOT NULL DEFAULT 1
);

ALTER TABLE "worker" ADD FOREIGN KEY ("job_id") REFERENCES "job" ("id");

ALTER TABLE "worker" ADD FOREIGN KEY ("shop_id") REFERENCES "shop" ("id");

ALTER TABLE "client_company" ADD FOREIGN KEY ("client_id") REFERENCES "client" ("id");

ALTER TABLE "client_company" ADD FOREIGN KEY ("company_id") REFERENCES "company" ("id");

ALTER TABLE "product_shop" ADD FOREIGN KEY ("product_id") REFERENCES "product" ("id");

ALTER TABLE "product_shop" ADD FOREIGN KEY ("shop_id") REFERENCES "shop" ("id");

ALTER TABLE "product" ADD FOREIGN KEY ("country_id") REFERENCES "country" ("id");

ALTER TABLE "order" ADD FOREIGN KEY ("client_id") REFERENCES "client" ("id");

ALTER TABLE "order" ADD FOREIGN KEY ("company_id") REFERENCES "company" ("id");

ALTER TABLE "order" ADD FOREIGN KEY ("status_id") REFERENCES "order_status" ("id");

ALTER TABLE "order" ADD FOREIGN KEY ("shop_id") REFERENCES "shop" ("id");

ALTER TABLE "order_items" ADD FOREIGN KEY ("order_id") REFERENCES "order" ("id");

ALTER TABLE "order_items" ADD FOREIGN KEY ("product_id") REFERENCES "product" ("id");
