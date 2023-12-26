// import { WithId } from "mongodb";
import { User } from "../models/user.ts";
import { DatabaseClient } from "../infrastructure/database.client.ts";
import { UserDTO } from "../models/user.dto.ts";

export class UsersController {
  private dbClient: DatabaseClient;

  constructor(dbClient: DatabaseClient) {
    this.dbClient = dbClient;
  }

  async insertOneUser(userDto: UserDTO): Promise<void> {
    const user = new User(userDto);

    await this.dbClient.insertOne(user);
  }
}
