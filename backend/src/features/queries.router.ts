import { FastifyInstance, FastifyRequest } from "fastify";
import { UsersController } from "./users.controller.ts";
import { UserDTO } from "../models/user.dto.ts";
import { Coverage } from "../models/types.ts";
import { User } from "../models/user.ts";

export class QueriesRouter {
  private controller: UsersController;

  constructor(queriesController: UsersController) {
    this.controller = queriesController;
  }

  routes = async (server: FastifyInstance) => {
    server.get(
      "/users/:name",
      async (request: FastifyRequest<{ Params: { name: string } }>) => {
        const name = request.params.name;

        const response = await this.controller.getOneUserByName(name);
        return response;
      }
    );

    server.get("/users/all", async () => {
      const response = await this.controller.getAllUsers();
      return response;
    });

    server.post("/users", async (request) => {
      const data: UserDTO = request.body as UserDTO;
      const newUser = await this.controller.insertOneUser(data);

      return { user: newUser };
    });

    server.put(
      "/users/:name/price-adjustment-selection",
      async (request: FastifyRequest<{ Params: { name: string } }>) => {
        const name = request.params.name;
        const data = request.body as Coverage;

        return this.controller.updatePriceAdjustmentSelectionStatus(name, data);
      }
    );

    server.put(
      "/users/:name/update",
      async (request: FastifyRequest<{ Params: { name: string } }>) => {
        const name = request.params.name;
        const data = request.body as User;

        return this.controller.updateUser(name, data);
      }
    );
  };
}
