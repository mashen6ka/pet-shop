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
