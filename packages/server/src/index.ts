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

import mocks from "./graphql/mocks";

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
