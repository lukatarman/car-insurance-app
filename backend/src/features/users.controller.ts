import { User } from "../models/user.ts";
import { DatabaseClient } from "../infrastructure/database.client.ts";
import { UserDTO } from "../models/user.dto.ts";
import { WithId } from "mongodb";
import { Coverage } from "../models/types.ts";

export class UsersController {
  private dbClient: DatabaseClient;

  constructor(dbClient: DatabaseClient) {
    this.dbClient = dbClient;
  }

  async insertOneUser(userData: UserDTO): Promise<void> {
    const user = new User(userData);

    return await this.dbClient.insertOne(user);
  }

  async getAllUsers(): Promise<WithId<Document>[]> {
    return await this.dbClient.getAll();
  }

  async getOneUserByName(name: string): Promise<User | null> {
    return await this.dbClient.getOne(name);
  }

  async updatePriceAdjustmentSelectionStatus(
    name: string,
    data: Coverage
  ): Promise<void> {
    const user = await this.getOneUserByName(name);
    if (!user) return;

    user.updatePriceAdjustmentSelectedStatus(data.name);

    await this.dbClient.replaceOneByName(name, user);
  }

  async updateUser(name: string, data: User) {
    const user = await this.getOneUserByName(name);
    if (!user) return;

    await this.dbClient.replaceOneByName(name, data);
  }
}
