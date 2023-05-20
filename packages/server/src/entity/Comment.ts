import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  AfterInsert,
} from "typeorm";

import AppDataSource from "../database";
import { User } from "./User";
import { Post } from "./Post";
import { Notification } from "./Notification";

const dataSource = AppDataSource;

@Entity()
export class Comment {
  @PrimaryGeneratedColumn() id: number;
  @Column("text") comment: string;
  @CreateDateColumn() createdAt: Date;

  @ManyToOne((type) => User, (user) => user.comments, {
    onDelete: "CASCADE",
  })
  author: User;
  @ManyToOne((type) => Post, (post) => post.comments, {
    onDelete: "CASCADE",
  })
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
        .where("post.id = :id", { id: this.post.id })
        .getOne()) as User;
      notification.postId = this.post.id;
      notification.text = `${this.author.fullName} commented on your post`;
      await notificationRepository.save(notification);
    }
  }
}
