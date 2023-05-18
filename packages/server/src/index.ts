import express, { Application } from "express";
import { ApolloServer, BaseContext } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

import { Repository } from "typeorm";

import cors from "cors";
import { json } from "body-parser";
import "reflect-metadata";
import AppDataSource from "./database";

import { gql } from "@apollo/client/core";
import { IResolvers } from "@graphql-tools/utils";

import appSchema from "./graphql/schema";
import { User, Post, Comment, Like, Notification } from "./entity";
import { GraphQLSchema } from "graphql";

export type Context = {
  orm: {
    userRepository: Repository<User>;
    postRepository: Repository<Post>;
    commentRepository: Repository<Comment>;
    likeRepository: Repository<Like>;
    notificationRepository: Repository<Notification>;
  };
};

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

  const userRepository: Repository<User> = DataSource.getRepository(User);
  const postRepository: Repository<Post> = DataSource.getRepository(Post);
  const commentRepository: Repository<Comment> =
    DataSource.getRepository(Comment);
  const likeRepository: Repository<Like> = DataSource.getRepository(Like);
  const notificationRepository: Repository<Notification> =
    DataSource.getRepository(Notification);

  const context: Context = {
    orm: {
      userRepository: userRepository,
      postRepository: postRepository,
      commentRepository: commentRepository,
      likeRepository: likeRepository,
      notificationRepository: notificationRepository,
    },
  };

  // https://www.apollographql.com/docs/apollo-server/migration/#context-initialization-function

  const server = new ApolloServer<Context>({
    schema: appSchema,
  });

  await server.start();
  server.assertStarted("expressMiddleware()");

  app.use(
    "/graphql",
    json(),
    expressMiddleware(server, {
      context: async () => ({
        orm: context.orm,
      }),
    })
  );

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}
