# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `yarn` in your terminal at the project root.

## Required Technologies

Your application must make use of the following libraries:

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate && db-migrate-pg from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing
- bcrypt from npm to hash password
- morgan from npm for loggen middleware
- helmet from npm for security

## .env required variables

PORT=5000
NODE_ENV=dev
PGHOST=localhost
PGDATABASE=store_dev
PGDATABASE_TEST=store_test
PGPORT=5432
PGUSER=your-postgres-user
PGPASSWORD=your-postgres-password
BCRYPT_PASSWORD=your-bcrypt-password
BCRYPT_ROUNDS=10your-bcrypt-secure
TOKEN_SECRET=your-secret-token

## Steps run app for the first time

1. write "yarn" in command line to install required packages
2. create database "store_dev" in postgre db
3. create another database "store_test" in postgre db to test code
4. create .env file and put required variables in .env file
5. "yarn migrate" use this command to migrate tables
6. "yarn start" this command will run the app
7. "yarn test" this command will test the app **notice** to run test change [NODE_ENV]to[test] from [.env] and run migration to migrate tables before start
8. server is running on port 5000 || http://localhost:5000/
9. database is running on port 5432
