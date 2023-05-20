import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  AfterInsert,
} from "typeorm";

import AppDataSource from "../database";

const dataSource = AppDataSource;

import { User } from "./User";
import { Post } from "./Post";
import { Notification } from "./Notification";

@Entity("likes")
export class Like {
  @PrimaryGeneratedColumn() id: number;
  @CreateDateColumn() createdAt: Date;
  @ManyToOne((type) => User, (user) => user.likes, { onDelete: "CASCADE" })
  user: User;
  @ManyToOne((type) => Post, (post) => post.likes, { onDelete: "CASCADE" })
  post: Post;

  @AfterInsert()
  async createNotification() {
    if (this.post && this.post.id) {
      const notificationRepository = dataSource.getRepository(Notification);
      const notification = notificationRepository.create();
      notification.user = (await dataSource
        .getRepository(User)
        .createQueryBuilder("user")
        .innerJoinAndSelect("user.post", "post")
        .where("post.id = :id", { id: this.post?.id })
        .getOne()) as User;
    }
  }
}
