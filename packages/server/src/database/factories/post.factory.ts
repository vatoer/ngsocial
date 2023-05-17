import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";
import { Post } from "../../entity/Post";

const faker = Faker;
export const PostsFactory = setSeederFactory(Post, (faker) => {
  const post = new Post();
  post.text = faker.lorem.text();
  post.image = faker.image.imageUrl();
  post.commentsCount = 100;
  post.likesCount = 200;
  post.latestLike = faker.name.fullName();
  post.createdAt = faker.date.past();
  return post;
});
