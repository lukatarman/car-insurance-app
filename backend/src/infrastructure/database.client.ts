import { Collection, MongoClient, WithId } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";
import { User } from "../models/user.ts";

export class DatabaseClient {
  public collection!: Collection<User>;
  public client!: MongoClient;

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

  async getAll(): Promise<WithId<User>[]> {
    return await this.collection.find().toArray();
  }

  async getOne(name: string): Promise<User | null> {
    const user = await this.collection.findOne({ name });

    if (!user) return null;

    return new User(user);
  }

  async replaceOneByName(name: string, data: User): Promise<void> {
    const user = new User(data);

    await this.collection.replaceOne({ name }, user);
  }

  stop(): void {
    this.client.close();
  }
}
