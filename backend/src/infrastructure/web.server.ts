import Fastify, { FastifyPluginCallback } from "fastify";
import cors, { FastifyCorsOptions } from "@fastify/cors";
import { QueriesRouter } from "../features/router.ts";

export class WebServer {
  private server: Fastify.FastifyInstance;

  constructor(gameQueriesRouter: QueriesRouter) {
    this.server = Fastify({
      logger: true,
    });

    this.server.register(cors as FastifyPluginCallback<FastifyCorsOptions>, {
      origin: "*",
    });
    this.server.register(gameQueriesRouter.routes);
  }

  async start() {
    this.server.log.info("Starting server...");
    try {
      await this.server.listen(3000);
    } catch (err) {
      this.server.log.error(err);
      process.exit(1);
    }
  }

  async stop() {
    this.server.log.info("Stopping server...");
    try {
      this.server.close();
    } catch (err) {
      this.server.log.error(err);
    }
  }
}
