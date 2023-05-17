import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

import { User } from "../../entity/User";
import { Post } from "../../entity/Post";
import { Comment } from "../../entity/Comment";
import { Like } from "../../entity/Like";
import { Notification } from "../../entity/Notification";
import { UsersFactory } from "../factories/user.factory";
import { PostsFactory } from "../factories/post.factory";
import { CommentsFactory } from "../factories/comment.factory";
import { LikesFactory } from "../factories/like.factory";
import { NotificationsFactory } from "../factories/notification.factory";
import { faker } from "@faker-js/faker";
import _ from "lodash";

export default class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    // Run the factories here

    const postsRepository = dataSource.getRepository(Post);
    const commentsRepository = dataSource.getRepository(Comment);

    const userFactory = factoryManager.get(User);
    const postsFactory = factoryManager.get(Post);
    const commentFactory = factoryManager.get(Comment);

    const users = await userFactory.saveMany(25);

    const numberOfComments = Math.floor(Math.random() * 100) + 1;

    // const getMultipleRandomComments = (comments: Comment[], num: number) => {
    //   const shuffled = [...comments].sort(() => 0.5 - Math.random());
    //   return shuffled.slice(0, num);
    // };

    // const maxNumOfComments = Math.floor(Math.random() * 10) + 1;
    // console.log(maxNumOfComments);
    // let randomComment = _.sampleSize(comments, maxNumOfComments);
    // let randomComment = getMultipleRandomComments(
    //   comments,
    //   maxNumOfComments
    // );

    const posts = await Promise.all(
      Array(100)
        .fill("")
        .map(async () => {
          const made = await postsFactory.make({
            author: faker.helpers.arrayElement(users),
            //comments: randomComment,
          });
          return made;
        })
    );
    await postsRepository.save(posts);

    const comments: Comment[] = await Promise.all(
      Array(numberOfComments)
        .fill("")
        .map(async () => {
          const made = await commentFactory.make({
            author: faker.helpers.arrayElement(users),
            post: faker.helpers.arrayElement(posts),
          });
          return made;
        })
    );
    await commentsRepository.save(comments);
  }
}
