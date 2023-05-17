import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";
import { Like } from "../../entity/Like";

const faker = Faker;
export const LikesFactory = setSeederFactory(Like, (faker) => {
  const like = new Like();
  like.createdAt = faker.date.past();
  return like;
});
