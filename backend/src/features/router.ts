import { FastifyInstance } from "fastify";
import { UsersController } from "./users.controller.ts";

export class QueriesRouter {
  private controller: UsersController;

  constructor(queriesController: UsersController) {
    this.controller = queriesController;
  }

  routes = async (server: FastifyInstance) => {
    server.get("/test", async (request) => {
      const data = request.params;
      console.log(data);
      this.controller;
      return;
    });
  };
}
