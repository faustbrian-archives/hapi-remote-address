import Hapi from "@hapi/hapi";
import { discover } from "@konceiver/remote-address";

import { config } from "../config";

export const onRequest = (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
	request.pre.remoteAddress = discover(request, config.get("headers"));

	return h.continue;
};
