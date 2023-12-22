import { User } from "./models/user";

console.log("started");

const testUser = new User("Luka Tarman", new Date("21 september 1989"), "Ljubljana", 500);

console.log(testUser);
