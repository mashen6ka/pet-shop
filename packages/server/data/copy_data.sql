\copy public.user(login,password,worker,first_name,last_name,middle_name,birthday,email,phone,personal_discount) FROM ../generator/data/user.csv WITH DELIMITER ',' NULL as '' CSV header;

\copy public.company(name,address,"KPP","INN") FROM ../generator/data/company.csv WITH DELIMITER ',' NULL as '' CSV header;

\copy public.user__company(user_id,company_id) FROM ../generator/data/user__company.csv WITH DELIMITER ',' NULL as '' CSV header;

\copy public.order_status(name) FROM ../generator/data/order_status.csv WITH DELIMITER ',' NULL as '' CSV header;

\copy public.shop(address,working_hours) FROM ../generator/data/shop.csv WITH DELIMITER ',' NULL as '' CSV header;

\copy public.order(user_id,company_id,status_id,created_at,completed_at,shop_id) FROM ../generator/data/order.csv WITH DELIMITER ',' NULL as '' CSV header;

\copy public.country(name) FROM ../generator/data/country.csv WITH DELIMITER ',' NULL as '' CSV header;

\copy public.manufacturer(name) FROM ../generator/data/manufacturer.csv WITH DELIMITER ',' NULL as '' CSV header;

\copy public.product(name,description,country_id,manufacturer_id,initial_price,discount,img_url) FROM ../generator/data/product.csv WITH DELIMITER ',' NULL as '' CSV header;

\copy public.order__product(order_id,product_id,quantity) FROM ../generator/data/order__product.csv WITH DELIMITER ',' NULL as '' CSV header;

\copy public.product__shop(product_id,shop_id,quantity) FROM ../generator/data/product__shop.csv WITH DELIMITER ',' NULL as '' CSV header;