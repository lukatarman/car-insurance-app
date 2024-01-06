// import { WithId } from "mongodb";
import { User } from "../models/user.ts";
import { DatabaseClient } from "../infrastructure/database.client.ts";
import { UserDTO } from "../models/user.dto.ts";
import { WithId } from "mongodb";
import { Coverage } from "../types/types.ts";
// import { Coverage } from "../types/types.ts";

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

  async getOneUserByName(name: string): Promise<User> {
    return await this.dbClient.getOne(name);
  }

  async updateCoverageSelectionStatus(name: string, data: Coverage) {
    const user = await this.getOneUserByName(name);

    const updatedCoverage = user.updateCoverageSelectedStatus(data.name);

    return await this.dbClient.updateCoverageSelectionStatus(user.name, updatedCoverage);
  }

  async updateDiscountSelectionStatus(name: string, data: Coverage) {
    const user = await this.getOneUserByName(name);

    const updatedDiscount = user.updateDiscountSelectedStatus(data.name);

    return await this.dbClient.updateDiscountSelectionStatus(user.name, updatedDiscount);
  }

  async updateSurchargeSelectionStatus(name: string, data: Coverage) {
    const user = await this.getOneUserByName(name);

    const updatedSurcharge = user.updateSurchargeSelectedStatus(data.name);

    return await this.dbClient.updateSurchargeSelectionStatus(
      user.name,
      updatedSurcharge
    );
  }
}
