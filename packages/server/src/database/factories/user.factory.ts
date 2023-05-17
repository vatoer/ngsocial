import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";
import { User } from "../../entity/User";

const faker = Faker;

export const UsersFactory = setSeederFactory(User, (faker) => {
  const user = new User();
  user.fullName = faker.internet.userName();
  user.bio = faker.lorem.sentences();
  user.email = faker.internet.email();
  user.username = faker.internet.userName();
  user.password = faker.internet.password();
  user.image = faker.image.imageUrl();
  user.coverImage = faker.image.imageUrl();
  user.postsCount = 200;
  user.createdAt = faker.date.past();
  return user;
});
