import { Server } from "@hapi/hapi";

import { config } from "./config";
import { onRequest } from "./events/request";

export const plugin = {
	pkg: require("../package.json"),
	once: true,
	register(server: Server, options = {}) {
		// Configure...
		config.load(options);

		if (config.hasError()) {
			throw config.getError();
		}

		// Register...
		server.ext("onRequest", onRequest);
	},
};
