import { MongoClient, WithId } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";
import { User } from "../models/user.ts";

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

  stop(): void {
    console.log("method ran");
    this.client.close();
    console.log("method ran after");
  }
}
