import express, { Application } from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import { json } from "body-parser";
import "reflect-metadata";
import AppDataSource from "./database";

import { gql } from "@apollo/client/core";
import { IResolvers } from "@graphql-tools/utils";

import appSchema from "./graphql/schema";

const DataSource = AppDataSource;
DataSource.initialize()
  .then(() => {
    startApolloServer();
  })
  .catch((err) => {
    console.log("Database connection error:", err);
  });

async function startApolloServer() {
  const PORT = 8080;
  const app: Application = express();
  app.use(cors());

  const server: ApolloServer = new ApolloServer({ schema: appSchema });

  await server.start();
  server.assertStarted("expressMiddleware()");

  app.use("/graphql", json(), expressMiddleware(server));

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}
