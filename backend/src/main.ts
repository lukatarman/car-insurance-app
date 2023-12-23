import { User } from "./models/user.ts";
import { MongoMemoryServer } from "mongodb-memory-server";

const main = async (): Promise<void> => {
  console.log("started");

  const testUser = new User(
    "Luka Tarman",
    new Date("21 september 1989"),
    "Ljubljana",
    500
  );

  const databaseServer = await MongoMemoryServer.create();

  console.log(databaseServer.getUri());
  console.log(testUser);
  databaseServer.stop();
};

main();
