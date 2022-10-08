CREATE TABLE "shop" (
  "id" SERIAL PRIMARY KEY,
  "address" text NOT NULL,
  "working_hours" jsonb NOT NULL,
  "phone" varchar(16)
);

CREATE TABLE "user" (
  "id" SERIAL PRIMARY KEY,
  "login" varchar(32) UNIQUE NOT NULL,
  "password" bytea NOT NULL,
  "worker" boolean NOT NULL DEFAULT false,
  "first_name" varchar(32) NOT NULL,
  "last_name" varchar(32) NOT NULL,
  "middle_name" varchar(32),
  "birthday" date,
  "email" varchar(512) NOT NULL,
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

CREATE TABLE "user__company" (
  "user_id" int NOT NULL,
  "company_id" int NOT NULL,
  PRIMARY KEY (user_id, company_id)
);

CREATE TABLE "product" (
  "id" SERIAL PRIMARY KEY,
  "name" text NOT NULL,
  "description" text NOT NULL,
  "country_id" int NOT NULL,
  "manufacturer_id" int NOT NULL,
  "initial_price" int NOT NULL,
  "discount" int NOT NULL DEFAULT 0 CHECK(discount >= 0 AND  discount <= 100),
  "img_url" text NULL
);

CREATE TABLE "product__shop" (
  "product_id" int NOT NULL,
  "shop_id" int NOT NULL,
  "quantity" int NOT NULL,
  PRIMARY KEY (product_id, shop_id)
);

CREATE TABLE "country" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(64) NOT NULL
);

CREATE TABLE "manufacturer" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(128) NOT NULL
);

CREATE TABLE "order" (
  "id" SERIAL PRIMARY KEY,
  "user_id" int NOT NULL,
  "company_id" int,
  "status_id" int NOT NULL,
  "created_at" timestamp DEFAULT LOCALTIMESTAMP,
  "completed_at" timestamp,
  "shop_id" int NOT NULL
);

CREATE TABLE "order_status" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(32) NOT NULL
);

CREATE TABLE "order__product" (
  "order_id" int NOT NULL,
  "product_id" int NOT NULL,
  "quantity" int NOT NULL DEFAULT 1,
  PRIMARY KEY (order_id, product_id)
);

CREATE TABLE "session" (
  "user_id" int NOT NULL,
  "token" text UNIQUE NOT NULL
);

ALTER TABLE "session" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE;

ALTER TABLE "user__company" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE CASCADE;

ALTER TABLE "user__company" ADD FOREIGN KEY ("company_id") REFERENCES "company" ("id") ON DELETE CASCADE;

ALTER TABLE "product__shop" ADD FOREIGN KEY ("product_id") REFERENCES "product" ("id") ON DELETE CASCADE;

ALTER TABLE "product__shop" ADD FOREIGN KEY ("shop_id") REFERENCES "shop" ("id") ON DELETE CASCADE;

ALTER TABLE "product" ADD FOREIGN KEY ("country_id") REFERENCES "country" ("id") ON DELETE SET NULL;

ALTER TABLE "product" ADD FOREIGN KEY ("manufacturer_id") REFERENCES "manufacturer" ("id") ON DELETE SET NULL;

ALTER TABLE "order" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id") ON DELETE SET NULL;

ALTER TABLE "order" ADD FOREIGN KEY ("company_id") REFERENCES "company" ("id") ON DELETE SET NULL;

ALTER TABLE "order" ADD FOREIGN KEY ("status_id") REFERENCES "order_status" ("id") ON DELETE SET NULL;

ALTER TABLE "order" ADD FOREIGN KEY ("shop_id") REFERENCES "shop" ("id") ON DELETE SET NULL;

ALTER TABLE "order__product" ADD FOREIGN KEY ("order_id") REFERENCES "order" ("id") ON DELETE CASCADE;

ALTER TABLE "order__product" ADD FOREIGN KEY ("product_id") REFERENCES "product" ("id")  ON DELETE SET NULL;
