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
pnpm install typeorm-extension --save
pnpm add typeorm-extension @faker-js/faker


```

# create factories for entities

```sh
cd src/database 
mkdir factories
touch user.factory.ts && touch post.factory.ts && 
touch comment.factory.ts && touch like.factory.ts && touch notification.factory.ts
```

# Seeding test data

reference : 

https://hashnode.devist.xyz/how-to-seed-a-database-with-typeorm-and-faker-in-2023
https://typeorm-extension.tada5hi.net/guide/seeding.html

# Using Apollo with TypeORM

Create A new graphql-types package

```sh
lerna create graphql-types
```

# Install GraphQL Codegen and the required plugins

```sh
pnpm install @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-resolvers
```

# generate graphql-types

generating Type save for resolver

```sh
npm run codegen
```

generated scalars ID will be string 
to custom this define 

schema.graphql
```graphql
scalars scalar ID
....

```

add `config` to configuration `codegen.yml`

```yml
schema: './packages/server/src/graphql/schema.graphql'
generates:
  ./packages/graphql-types/src/resolvers-types.ts:
    plugins:
      - typescript
      - typescript-resolvers
    config:
      scalars:
        ID: number

```

# add mutation query