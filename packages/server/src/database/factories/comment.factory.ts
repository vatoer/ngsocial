import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";
import { Comment } from "../../entity/Comment";

const faker = Faker;
export const CommentsFactory = setSeederFactory(Comment, (faker) => {
  const comment = new Comment();
  comment.comment = faker.lorem.text();
  comment.createdAt = faker.date.past();
  return comment;
});
