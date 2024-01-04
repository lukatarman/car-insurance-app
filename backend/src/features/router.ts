import { FastifyInstance } from "fastify";
import { UsersController } from "./users.controller.ts";

export class QueriesRouter {
  private controller: UsersController;

  constructor(queriesController: UsersController) {
    this.controller = queriesController;
  }

  routes = async (server: FastifyInstance) => {
    server.post("/users", async (request) => {
      const data = request.body;
      console.log("Data:");
      console.log(data);
      this.controller;
      return;
    });
  };
}
