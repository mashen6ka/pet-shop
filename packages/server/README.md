# pet-shop

psql postgres://postgres:postgres@localhost:9999/main
\i data/copy_data.sql

## Запуск тестов

- `npm run test` - все тесты
- `npm run test:unit` - только юнит-тесты
- `npm run test:integration` - только интеграционные тесты

## Генерация отчета

Сначала необходимо запустить тесты, после чего выполнить команду `allure serve` или `allure generate`.

[гайд по настройке allure](https://www.swtestacademy.com/how-to-integrate-allure-report-for-jest-tests/)

## Нагрузочное тестирование

- ab -n 100 -c 10 https://pet-shop.test/api/v1/products

Server Software: mashenka
Server Hostname: pet-shop.test
Server Port: 443
SSL/TLS Protocol: TLSv1.2,ECDHE-RSA-CHACHA20-POLY1305,2048,256
Server Temp Key: ECDH X25519 253 bits
TLS Server Name: pet-shop.test

Document Path: /api/v1/products
Document Length: 392840 bytes

Concurrency Level: 10
Time taken for tests: 3.119 seconds
Complete requests: 100
Failed requests: 0
Total transferred: 39326100 bytes
HTML transferred: 39284000 bytes
Requests per second: 32.07 [#/sec] (mean)
Time per request: 311.862 [ms] (mean)
Time per request: 31.186 [ms] (mean, across all concurrent requests)
Transfer rate: 12314.56 [Kbytes/sec] received

Connection Times (ms)
min mean[+/-sd] median max
Connect: 7 18 9.9 14 45
Processing: 26 277 202.7 238 808
Waiting: 12 248 199.0 208 793
Total: 35 294 204.6 255 821

Percentage of the requests served within a certain time (ms)
50% 255
66% 329
75% 401
80% 527
90% 663
95% 690
98% 709
99% 821
100% 821 (longest request)
