import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Comment = {
  __typename?: 'Comment';
  author: User;
  comment: Scalars['String'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  post: Post;
};

export type Like = {
  __typename?: 'Like';
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  post: Post;
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  comment?: Maybe<Comment>;
  like?: Maybe<Like>;
  post?: Maybe<Post>;
  removeComment?: Maybe<Comment>;
  removeLike?: Maybe<Like>;
  removeNotification?: Maybe<Scalars['ID']>;
  removePost?: Maybe<Scalars['ID']>;
};


export type MutationCommentArgs = {
  comment: Scalars['String'];
  postId: Scalars['ID'];
};


export type MutationLikeArgs = {
  postId: Scalars['ID'];
};


export type MutationPostArgs = {
  image?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
};


export type MutationRemoveCommentArgs = {
  id: Scalars['ID'];
};


export type MutationRemoveLikeArgs = {
  postId: Scalars['ID'];
};


export type MutationRemoveNotificationArgs = {
  id: Scalars['ID'];
};


export type MutationRemovePostArgs = {
  id: Scalars['ID'];
};

export type Notification = {
  __typename?: 'Notification';
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  postId: Scalars['ID'];
  text: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  author: User;
  commentsCount: Scalars['Int'];
  createdAt: Scalars['String'];
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  latestComment?: Maybe<Comment>;
  latestLike?: Maybe<Scalars['String']>;
  likedByAuthUser?: Maybe<Scalars['Boolean']>;
  likesCount: Scalars['Int'];
  text?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  getCommentsByPostId?: Maybe<Array<Maybe<Comment>>>;
  getFeed?: Maybe<Array<Maybe<Post>>>;
  getLikesByPostId?: Maybe<Array<Maybe<Like>>>;
  getNotificationsByUserId?: Maybe<Array<Maybe<Notification>>>;
  getPostsByUserId?: Maybe<Array<Maybe<Post>>>;
  getUser?: Maybe<User>;
  message: Scalars['String'];
  searchUsers?: Maybe<Array<Maybe<User>>>;
};


export type QueryGetCommentsByPostIdArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  postId: Scalars['ID'];
};


export type QueryGetFeedArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
};


export type QueryGetLikesByPostIdArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  postId: Scalars['ID'];
};


export type QueryGetNotificationsByUserIdArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  userId: Scalars['ID'];
};


export type QueryGetPostsByUserIdArgs = {
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  userId: Scalars['ID'];
};


export type QueryGetUserArgs = {
  userId: Scalars['ID'];
};


export type QuerySearchUsersArgs = {
  searchQuery?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  bio?: Maybe<Scalars['String']>;
  coverImage?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  email: Scalars['String'];
  fullName: Scalars['String'];
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  postsCount: Scalars['Int'];
  username: Scalars['String'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Comment: ResolverTypeWrapper<Comment>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Like: ResolverTypeWrapper<Like>;
  Mutation: ResolverTypeWrapper<{}>;
  Notification: ResolverTypeWrapper<Notification>;
  Post: ResolverTypeWrapper<Post>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  Comment: Comment;
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Like: Like;
  Mutation: {};
  Notification: Notification;
  Post: Post;
  Query: {};
  String: Scalars['String'];
  User: User;
};

export type CommentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = {
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  comment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LikeResolvers<ContextType = any, ParentType extends ResolversParentTypes['Like'] = ResolversParentTypes['Like']> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  comment?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType, RequireFields<MutationCommentArgs, 'comment' | 'postId'>>;
  like?: Resolver<Maybe<ResolversTypes['Like']>, ParentType, ContextType, RequireFields<MutationLikeArgs, 'postId'>>;
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, Partial<MutationPostArgs>>;
  removeComment?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType, RequireFields<MutationRemoveCommentArgs, 'id'>>;
  removeLike?: Resolver<Maybe<ResolversTypes['Like']>, ParentType, ContextType, RequireFields<MutationRemoveLikeArgs, 'postId'>>;
  removeNotification?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType, RequireFields<MutationRemoveNotificationArgs, 'id'>>;
  removePost?: Resolver<Maybe<ResolversTypes['ID']>, ParentType, ContextType, RequireFields<MutationRemovePostArgs, 'id'>>;
};

export type NotificationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Notification'] = ResolversParentTypes['Notification']> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  postId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PostResolvers<ContextType = any, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  author?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  commentsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  latestComment?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType>;
  latestLike?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  likedByAuthUser?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  likesCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getCommentsByPostId?: Resolver<Maybe<Array<Maybe<ResolversTypes['Comment']>>>, ParentType, ContextType, RequireFields<QueryGetCommentsByPostIdArgs, 'postId'>>;
  getFeed?: Resolver<Maybe<Array<Maybe<ResolversTypes['Post']>>>, ParentType, ContextType, Partial<QueryGetFeedArgs>>;
  getLikesByPostId?: Resolver<Maybe<Array<Maybe<ResolversTypes['Like']>>>, ParentType, ContextType, RequireFields<QueryGetLikesByPostIdArgs, 'postId'>>;
  getNotificationsByUserId?: Resolver<Maybe<Array<Maybe<ResolversTypes['Notification']>>>, ParentType, ContextType, RequireFields<QueryGetNotificationsByUserIdArgs, 'userId'>>;
  getPostsByUserId?: Resolver<Maybe<Array<Maybe<ResolversTypes['Post']>>>, ParentType, ContextType, RequireFields<QueryGetPostsByUserIdArgs, 'userId'>>;
  getUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserArgs, 'userId'>>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  searchUsers?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType, Partial<QuerySearchUsersArgs>>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  coverImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  fullName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  postsCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Comment?: CommentResolvers<ContextType>;
  Like?: LikeResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Notification?: NotificationResolvers<ContextType>;
  Post?: PostResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

