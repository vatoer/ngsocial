import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";
import { Notification } from "../../entity/Notification";

const faker = Faker;
export const NotificationsFactory = setSeederFactory(Notification, (faker) => {
  const notification = new Notification();
  notification.text = faker.lorem.words();
  notification.postId = 1;
  notification.createdAt = faker.date.past();
  return notification;
});
