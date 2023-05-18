import { Context } from "..";

import {
  Resolvers,
  User,
  Post,
  Comment,
  Like,
  Notification,
} from "@ngsocial/graphql";

import { GraphQLError } from "graphql";

import { IResolvers } from "@graphql-tools/utils";
import { from } from "@apollo/client";
const resolvers: Resolvers = {
  Query: {
    message: () => "It works!",
    getUser: async (_, args, ctx: Context) => {
      const orm = ctx.orm;
      const user = await orm.userRepository.findOne({
        where: { id: args.userId },
      });
      if (!user) {
        throw new GraphQLError("USER_NOT_FOUND");
      }

      return user as unknown as User;
    },
  },
};

export default resolvers;
