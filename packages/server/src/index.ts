import express, { Application } from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import { json } from "body-parser";

import { gql } from "@apollo/client/core";
import { IResolvers } from "@graphql-tools/utils";

import { addMocksToSchema } from "@graphql-tools/mock";
import { makeExecutableSchema } from "@graphql-tools/schema";
import casual from "casual";

import appSchema from "./graphql/schema";

let postsIds: string[] = [];
let usersIds: string[] = [];

const mocks = {
  User: () => ({
    id: () => {
      let uuid = casual.uuid;
      usersIds.push(uuid);
      return uuid;
    },
    fullName: casual.full_name,
    bio: casual.text,
    email: casual.email,
    username: casual.username,
    password: casual.password,
    image: "https://picsum.photos/seed/picsum/200/300",
    coverImage: "https://picsum.photos/seed/picsum/200/300",
    postsCount: () => casual.integer(0),
  }),
  Post: () => ({
    id: () => {
      let uuid = casual.uuid;
      postsIds.push(uuid);
      return uuid;
    },
    author: casual.random_element(usersIds),
    text: casual.text,
    image: "https://picsum.photos/seed/picsum/200/300",
    commentsCount: () => casual.integer(0),
    likesCount: () => casual.integer(0),
    latestLike: casual.first_name,
    createdAt: () => casual.date(),
  }),
  Comment: () => ({
    id: casual.uuid,
    comment: casual.text,
    author: casual.random_element(usersIds),
    post: casual.random_element(postsIds),
    createdAt: () => casual.date(),
  }),
  Like: () => ({
    id: casual.uuid,
    post: casual.random_element(postsIds),
  }),
  Query: () => ({
    getPostsByUserId: () => [...new Array(casual.integer(10, 100))],
    getFeed: () => [...new Array(casual.integer(10, 100))],
    getNotificationsByUserId: () => [...new Array(casual.integer(10, 100))],
    getCommentsByPostId: () => [...new Array(casual.integer(10, 100))],
    getLikesByPostId: () => [...new Array(casual.integer(10, 100))],
    searchUsers: () => [...new Array(casual.integer(10, 100))],
  }),
};

const PORT = 8080;
const app: Application = express();
app.use(cors());

async function startApolloServer() {
  const PORT = 8080;
  const app: Application = express();

  const server: ApolloServer = new ApolloServer({
    // addMocksToSchema accepts a schema instance and provides
    // mocked data for each field in the schema
    schema: addMocksToSchema({
      schema: appSchema,
      mocks,
      preserveResolvers: true,
    }),
  });

  await server.start();
  server.assertStarted("expressMiddleware()");

  app.use("/graphql", json(), expressMiddleware(server));

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

startApolloServer();
