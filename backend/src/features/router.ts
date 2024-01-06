import { FastifyInstance, FastifyRequest } from "fastify";
import { UsersController } from "./users.controller.ts";
import { UserDTO } from "../models/user.dto.ts";
import { Coverage, Discount, Surcharge } from "../types/types.ts";
// import { Coverage } from "../types/types.ts";

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
        console.log("getting user:");
        console.log(name);

        const response = await this.controller.getOneUserByName(name);
        return response;
      }
    );

    server.post("/users", async (request) => {
      const data: UserDTO = request.body as UserDTO;
      const newUser = await this.controller.insertOneUser(data);
      console.log("added user:");
      console.log(data.name);

      const response = await this.controller.getAllUsers();
      console.log(response);
      return { user: newUser };
    });

    server.put(
      "/users/:name/coverage",
      async (request: FastifyRequest<{ Params: { name: string } }>) => {
        const name = request.params.name;
        const data = request.body as Coverage;

        return this.controller.updateCoverageSelectionStatus(name, data);
      }
    );

    server.put(
      "/users/:name/discount",
      async (request: FastifyRequest<{ Params: { name: string } }>) => {
        const name = request.params.name;
        const data = request.body as Discount;

        return this.controller.updateDiscountSelectionStatus(name, data);
      }
    );

    server.put(
      "/users/:name/surcharge",
      async (request: FastifyRequest<{ Params: { name: string } }>) => {
        const name = request.params.name;
        const data = request.body as Surcharge;

        return this.controller.updateSurchargeSelectionStatus(name, data);
      }
    );
  };
}
