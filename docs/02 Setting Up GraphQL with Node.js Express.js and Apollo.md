Setting Up GraphQL with Node.js, Express.js, and Apollo

# Setting up a monorepo project

```sh
npm install --global lerna
```

```sh
mkdir ngsocial
cd ngsocial
lerna init
```

# Generating a package.json file

```sh
cd packages
mkdir server && cd server
pnpm init
```

# Installing Express.js and development dependencies

```sh
pnpm add express
```

ts-node, a tool that enables you to start a development server based on TypeScript
directly from the Terminal without compiling it to plain JavaScript

```sh
pnpm add --save-dev typescript ts-node
.\node_modules\.bin\tsc -v
.\node_modules\.bin\tsc --init
```

Next, we need to install the type definitions for Node and Express.js using the following
command:

```sh
pnpm add –save-dev @types/node @types/express
```

commit the change
```sh
git add -A
git commit -m "Installing Express and development dependencies"
```

# Creating the server

```sh
mkdir src && touch src/index.ts
```

# Watching and recompiling our code

```sh
pnpm add --save-dev ts-node-dev
```

# Creating a GraphQL API

## Installing the necessary libraries

```sh 
cd packages/server
pnpm add graphql @apollo/server @graphql-tools/utils @graphql-tools/schema
pnpm add install --save-dev graphql-tag
pnpm add @apollo/client
pnpm add cors body-parser
pnpm add @types/body-parser @types/cors --save-dev

```

# Exposing a simple GraphQL API

# Creating a GraphQL schema for our social network

```sh
cd src && mkdir graphql 
cd graphql && touch schema.ts && touch schema.graphql && touch resolvers.ts 
```

## creating type User, Post, Comment, Like, Notification
type Query must be define in root resolver and schema

## add queries to schema.graphql

## add mutation to schema.graphql

# Mocking our GraphQL API

reference: https://www.apollographql.com/docs/apollo-server/testing/mocking/

```sh
pnpm add --save-dev @graphql-tools/mock @graphql-tools/schema
```
contoh json body request

```json
{
  "query": "query MockSearchUserAndPost($searchQuery: String, $userId: ID!) { searchUsers(searchQuery: $searchQuery) { id fullName email postsCount } getPostsByUserId(userId: $userId) { id text author { id fullName } commentsCount latestComment { Comment } }}",
  "variables": {
    "searchQuery": "a",
    "userId": "12ce6c8b-be2f-4e1a-b47d-4a4214be221d"
  }
}
```

# Mocking our GraphQL API with more realistic and random values

```sh
 pnpm install casual
 ```

# Linking the mocked data


# Configuring CORS
```sh
pnpm  install cors
```
