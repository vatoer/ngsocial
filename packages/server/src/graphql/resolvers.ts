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

    /**
     *
     * @param _
     * @param args
     * @param ctx
     * @returns
     */
    getPostsByUserId: async (_, args, ctx: Context) => {
      const posts = await ctx.orm.postRepository
        .createQueryBuilder("post")
        .where({ author: { id: args.userId } })
        .leftJoinAndSelect("post.author", "post_author")
        .leftJoinAndSelect("post.latestComment", "latestComment")
        .leftJoinAndSelect("latestComment.author", "latestComment_author")
        .leftJoinAndSelect("post.likes", "likes")
        .leftJoinAndSelect("likes.user", "likes_user")
        .orderBy("post.createdAt", "DESC")
        .skip(args.offset as number)
        .take(args.limit as number)
        .getMany();
      return posts as unknown as Post[];
    }, // end getPostsByUserId

    getFeed: async (_, args, ctx: Context) => {
      const feed = await ctx.orm.postRepository
        .createQueryBuilder("post")
        .leftJoinAndSelect("post.author", "post_author")
        .leftJoinAndSelect("post.latestComment", "latestComment")
        .leftJoinAndSelect("latestComment.author", "latestComment_author")
        .leftJoinAndSelect("post.likes", "likes")
        .leftJoinAndSelect("likes.user", "likes_user")
        .orderBy("post.createdAt", "DESC")
        .skip(args.offset as number)
        .take(args.limit as number)
        .getMany();
      return feed as unknown as Post[];
    },

    getNotificationsByUserId: async (_, args, ctx: Context) => {
      const notifications = await ctx.orm.notificationRepository
        .createQueryBuilder("notification")
        .innerJoinAndSelect("notification.user", "user")
        .where("user.id = :userId", { userId: args.userId })
        .orderBy("notification.createdAt", "DESC")
        .skip(args.offset as number)
        .take(args.limit as number)
        .getMany();
      return notifications as unknown as Notification[];
    },

    getCommentsByPostId: async (_, args, ctx: Context) => {
      return (await ctx.orm.commentRepository
        .createQueryBuilder("comment")
        .innerJoinAndSelect("comment.author", "author")
        .innerJoinAndSelect("comment.post", "post")
        .where("post.id = :id", { id: args.postId as number })
        .orderBy("comment.createdAt", "DESC")
        .skip(args.offset as number)
        .take(args.limit as number)
        .getMany()) as unknown as Comment[];
    },

    getLikesByPostId: async (_, args, ctx: Context) => {
      return (await ctx.orm.likeRepository
        .createQueryBuilder("like")
        .innerJoinAndSelect("like.user", "user")
        .innerJoinAndSelect("like.post", "post")
        .where("post.id = :id", { id: args.postId })
        .orderBy("like.createdAt", "DESC")
        .skip(args.offset as number)
        .take(args.limit as number)
        .getMany()) as unknown as Like[];
    },

    searchUsers: async (_, args, ctx: Context) => {
      const users = await ctx.orm.userRepository
        .createQueryBuilder("user")
        .where(
          `
          user.fullName Like
          '%${args.searchQuery}%'
          `
        )
        .orWhere(
          `
          user.username Like
          '%${args.searchQuery}%'
          `
        )
        .getMany();
      return users as unknown as User[];
    },
  }, //end Query
};

export default resolvers;
