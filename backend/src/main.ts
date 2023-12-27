import { UsersController } from "./features/users.controller.ts";
import { DatabaseClient } from "./infrastructure/database.client.ts";
import { User } from "./models/user.ts";

const main = async (): Promise<void> => {
  console.log("started");

  const database = await new DatabaseClient().init();

  const usersController = new UsersController(database);

  const user = {
    name: "Luka",
    birthday: new Date("27 december 1980 utc"),
    city: "rijeka",
    vehiclePower: 4,
  };
  const user2 = {
    name: "Tar",
    birthday: new Date("27 december 1980 utc"),
    city: "osijek",
    vehiclePower: 4,
  };
  const user3 = {
    name: "test",
    birthday: new Date(),
    city: "test",
    vehiclePower: 400,
  };

  const user4 = new User(user3);

  await usersController.insertOneUser(user);
  await usersController.insertOneUser(user2);
  await usersController.insertOneUser(user3);
  console.log(await database.getAll());
  console.log(user4);
};

main();
