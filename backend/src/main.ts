import { DatabaseClient } from "./infrastructure/database.client.ts";
import { User } from "./models/user.ts";

const main = async (): Promise<void> => {
  console.log("started");

  const database = await new DatabaseClient().init();

  const testUser = new User("Roko", new Date("21 september 1989"), "Ljubljana", 500);

  await database.insertOne(testUser);
  const results = await database.getAll();

  console.log(testUser);
  console.log(results);

  database.stop();
};

main();
