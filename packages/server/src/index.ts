import express, { Application } from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import { json } from "body-parser";

import { gql } from "@apollo/client/core";
import { IResolvers } from "@graphql-tools/utils";

const PORT = 8080;
const app: Application = express();

const typeDefs = gql`
  type Query {
    message: String!
  }
`;

const resolvers: IResolvers = {
  Query: {
    message: () => "It works!",
  },
};

const config = {
  typeDefs: typeDefs,
  resolvers: resolvers,
};

async function startApolloServer(config: any) {
  const PORT = 8080;
  const app: Application = express();

  const server: ApolloServer = new ApolloServer(config);

  await server.start();
  server.assertStarted("expressMiddleware()");

  app.use("/graphql", json(), expressMiddleware(server));

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

startApolloServer(config);
