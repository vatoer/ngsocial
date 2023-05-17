Connecting the Database with TypeORM

# Creating a MySQL user and database

```sql
CREATE USER 'dbuser'@'localhost' IDENTIFIED WITH mysql_native_password BY 'p4ssw0rd';
GRANT ALL PRIVILEGES ON * . * TO dbuser@'localhost';
FLUSH PRIVILEGES;
create database socialdb;
```

# Setting up TypeORM and MySQL

```sh
cd ngsocial/packages/server/
pnpm install typeorm reflect-metadata mysql
```