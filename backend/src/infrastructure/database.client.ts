import { Collection, MongoClient, WithId } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";

export class DatabaseClient {
  public collection: Collection<Document>;
  public client: MongoClient;

  async init(): Promise<this> {
    const url = (await MongoMemoryServer.create()).getUri();
    const dbName = "car_insurance";

    this.client = new MongoClient(url);

    this.client.connect();

    const database = this.client.db(dbName);
    this.collection = database.collection("users");

    return this;
  }

  async insertOne(testUser: any): Promise<void> {
    await this.collection.insertOne(testUser);
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
