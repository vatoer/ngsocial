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

# Creating TypeORM entities

```sh
cd ngsocial/packages/server/
mkdir src/entity
cd src/entity
touch User.ts && touch Post.ts && touch Comment.ts && touch Like.ts && touch Notification.ts
```

# build certain relationships between the entities

# Seeding test data

```sh
pnpm add typeorm-seeding

Issues with peer dependencies found
.
└─┬ typeorm-seeding 1.6.1
  └── ✕ unmet peer typeorm@^0.2.24: found 0.3.16
```

```sh
pnpm add -D faker
cd src/database 

```