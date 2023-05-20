import { Context } from "..";

import {
  Resolvers,
  User,
  Post,
  Comment,
  Like,
  Notification,
} from "@ngsocial/graphql";

import {
  Post as PostEntity,
  Comment as CommentEntity,
  Like as LikeEntity,
} from "../entity";

import { GraphQLError } from "graphql";

import { IResolvers } from "@graphql-tools/utils";
import { from } from "@apollo/client";

import { DeleteResult, QueryFailedError } from "typeorm";

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

  Mutation: {
    post: (_, args, ctx: Context) => {
      throw new GraphQLError("Not implemented yet");
    },
    comment: (_, args, ctx: Context) => {
      throw new GraphQLError("Not implemented yet");
    },
    like: (_, args, ctx: Context) => {
      throw new GraphQLError("Not implemented yet");
    },
    removeLike: async (_, args, ctx: Context) => {
      throw new GraphQLError("Not implemented yet");
    },
    removePost: async (_, args, { orm }: Context) => {
      const post = await orm.postRepository.findOne({
        where: {
          id: args.id,
        },
        relations: ["author"],
      });
      if (!post) {
        throw new GraphQLError("Post not found");
      }
      const result: DeleteResult = await orm.postRepository
        .createQueryBuilder()
        .delete()
        .from(PostEntity)
        .where("id = :id", { id: args.id })
        .execute();
      const postsCount = post?.author?.postsCount;
      if (postsCount && postsCount >= 1) {
        await orm.userRepository.update(
          { id: post?.author.id },
          { postsCount: postsCount - 1 }
        );
      }
      if (result.affected && result.affected <= 0) {
        throw new GraphQLError("Post not deleted");
      }
      return args.id;
    },

    removeComment: async (_, args, { orm }: Context) => {
      const comment = await orm.commentRepository.findOne({
        where: {
          id: args.id,
        },
        relations: ["author", "post"],
      });
      if (!comment) {
        throw new GraphQLError("Comment not found");
      }
      const result: DeleteResult = await orm.commentRepository.delete(args.id);
      if (result.affected && result.affected <= 0) {
        throw new GraphQLError("Comment not deleted");
      }
      const commentsCount = comment?.post?.commentsCount;
      if (commentsCount && commentsCount >= 1) {
        await orm.postRepository.update(comment.post.id, {
          commentsCount: commentsCount - 1,
        });
      }
      return comment as unknown as Comment;
    },

    removeNotification: async (_, args, { orm }: Context) => {
      const notificationRepository = orm.notificationRepository;
      const notification = await notificationRepository.findOne({
        where: {
          id: args.id,
        },
        relations: ["user"],
      });

      if (!notification) {
        throw new GraphQLError("Notification not found");
      }
      const result: DeleteResult = await notificationRepository.delete(args.id);
      if (result.affected && result.affected <= 0) {
        throw new GraphQLError("Notification not deleted");
      }
      return args.id;
    },
  },
};

export default resolvers;
