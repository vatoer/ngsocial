import { Context } from "..";

import {
  Resolvers,
  User,
  Post,
  Comment,
  Like,
  Notification,
} from "@ngsocial/graphql";

import { ApolloError } from "@apollo/client";

import { IResolvers } from "@graphql-tools/utils";
import { from } from "@apollo/client";
const resolvers: Resolvers = {
  Query: {
    message: () => "It works!",
  },
};

export default resolvers;
