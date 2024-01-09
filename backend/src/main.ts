import { QueriesRouter } from "./features/queries.router.ts";
import { UsersController } from "./features/users.controller.ts";
import { DatabaseClient } from "./infrastructure/database.client.ts";
import { WebServer } from "./infrastructure/web.server.ts";

const main = async (): Promise<void> => {
  const database = await new DatabaseClient().init();

  const usersController = new UsersController(database);

  const queriesRouter = new QueriesRouter(usersController);

  const webServer = new WebServer(queriesRouter);

  webServer.start();

  const user = {
    name: "Luka Tarman",
    birthday: new Date("21 september 1980 utc"),
    city: "rijeka",
    vehiclePower: 400,
  };

  await usersController.insertOneUser(user);
};

main();
