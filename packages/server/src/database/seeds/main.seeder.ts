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

export default class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    // Run the factories here

    const postsRepository = dataSource.getRepository(Post);

    const userFactory = factoryManager.get(User);
    const postsFactory = factoryManager.get(Post);

    const users = await userFactory.saveMany(7);

    const posts = await Promise.all(
      Array(17)
        .fill("")
        .map(async () => {
          const made = await postsFactory.make({
            author: faker.helpers.arrayElement(users),
          });
          return made;
        })
    );
    await postsRepository.save(posts);
  }
}
