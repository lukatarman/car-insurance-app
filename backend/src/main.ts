import { User } from "./models/user.ts";
import { MongoMemoryServer } from "mongodb-memory-server";

console.log("started");

const testUser = new User("Luka Tarman", new Date("21 september 1989"), "Ljubljana", 500);

const database = async () => await MongoMemoryServer.create();

console.log(database);
console.log(testUser);
