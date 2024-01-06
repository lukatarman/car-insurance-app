import { MongoClient, WithId } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";
import { User } from "../models/user.ts";
// import { Coverage } from "../types/types.ts";

export class DatabaseClient {
  public collection: any = "";
  public client: any;

  async init(): Promise<this> {
    const url = (await MongoMemoryServer.create()).getUri();
    const dbName = "car_insurance";

    this.client = new MongoClient(url);

    this.client.connect();

    const database = this.client.db(dbName);
    this.collection = database.collection("users");

    return this;
  }

  async insertOne(user: User): Promise<void> {
    await this.collection.insertOne(user);
  }

  async getAll(): Promise<WithId<Document>[]> {
    return await this.collection.find().toArray();
  }

  async getOne(name: string): Promise<User> {
    return new User(await this.collection.findOne({ name }));
  }

  async updateCoverageSelectionStatus(name: string, coverage: any) {
    return await this.collection.updateOne(
      { name: name, "coverages.name": coverage.name },
      {
        $set: {
          "coverages.$.isSelected": true,
        },
      }
    );
  }

  async updateDiscountSelectionStatus(name: string, discount: any) {
    return await this.collection.updateOne(
      { name: name, "discounts.name": discount.name },
      {
        $set: {
          "discounts.$.isSelected": true,
        },
      }
    );
  }

  async updateSurchargeSelectionStatus(name: string, surcharge: any) {
    return await this.collection.updateOne(
      { name: name, "surcharges.name": surcharge.name },
      {
        $set: {
          "surcharges.$.isSelected": true,
        },
      }
    );
  }

  stop(): void {
    console.log("method ran");
    this.client.close();
    console.log("method ran after");
  }
}
