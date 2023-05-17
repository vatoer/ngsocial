// import { DataSource, DataSourceOptions } from "typeorm";
// import { runSeeders, SeederOptions } from "typeorm-extension";
// import { Post } from "../entity/Post";
// import { User } from "../entity/User";
// import { Comment } from "../entity/Comment";
// import { Like } from "../entity/Like";
// import { Notification } from "../entity/Notification";
// import MainSeeder from "./seeds/main.seeder";
// import { UsersFactory } from "./factories/user.factory";
// import { PostsFactory } from "./factories/post.factory";
// import { CommentsFactory } from "./factories/comment.factory";
// import { LikesFactory } from "./factories/like.factory";
// import { NotificationsFactory } from "./factories/notification.factory";

// const options: DataSourceOptions & SeederOptions = {
//   type: "mysql",
//   host: "localhost",
//   port: 3306,
//   username: "dbuser",
//   password: "p4ssw0rd",
//   database: "socialdb",
//   entities: [User, Post, Comment, Like, Notification],
//   seeds: [MainSeeder],
//   factories: [
//     UsersFactory,
//     PostsFactory,
//     CommentsFactory,
//     LikesFactory,
//     NotificationsFactory,
//   ],
// };

// export const AppDataSource = new DataSource(options);

// (async () => {
//   console.log("here Iam");
//   await AppDataSource.initialize();

//   await runSeeders(AppDataSource);
// })();
