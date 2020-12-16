import Hapi from "@hapi/hapi";
import { plugin } from "../src";

let server: Hapi.Server;

const sendRequest = (url: string, headers = {}) => {
	server.route({
		method: "GET",
		path: "/",
		handler: () => [],
	});

	return server.inject({ method: "GET", url, headers });
};

beforeEach(async () => {
	server = new Hapi.Server({ debug: { request: ["*"] } });

	await server.register({ plugin });
});

describe("Remote Address", () => {
	it('should pass with the "info.remoteAddress" property', async () => {
		const response = await sendRequest("/");

		expect(response.request.pre.remoteAddress).toBe("127.0.0.1");
	});

	it('should pass with the "x-client-ip" header', async () => {
		const response = await sendRequest("/", {
			"x-client-ip": "127.0.0.2",
		});

		expect(response.request.pre.remoteAddress).toBe("127.0.0.2");
	});

	it('should pass with the "x-forwarded-for" header', async () => {
		const response = await sendRequest("/", {
			"x-forwarded-for": "127.0.0.3",
		});

		expect(response.request.pre.remoteAddress).toBe("127.0.0.3");
	});

	it('should pass with the "cf-connecting-ip" header', async () => {
		const response = await sendRequest("/", {
			"cf-connecting-ip": "127.0.0.4",
		});

		expect(response.request.pre.remoteAddress).toBe("127.0.0.4");
	});

	it('should pass with the "fastly-client-ip" header', async () => {
		const response = await sendRequest("/", {
			"fastly-client-ip": "127.0.0.5",
		});

		expect(response.request.pre.remoteAddress).toBe("127.0.0.5");
	});

	it('should pass with the "true-client-ip" header', async () => {
		const response = await sendRequest("/", {
			"true-client-ip": "127.0.0.6",
		});

		expect(response.request.pre.remoteAddress).toBe("127.0.0.6");
	});

	it('should pass with the "x-real-ip" header', async () => {
		const response = await sendRequest("/", {
			"x-real-ip": "127.0.0.7",
		});

		expect(response.request.pre.remoteAddress).toBe("127.0.0.7");
	});

	it('should pass with the "x-cluster-client-ip" header', async () => {
		const response = await sendRequest("/", {
			"x-cluster-client-ip": "127.0.0.18",
		});

		expect(response.request.pre.remoteAddress).toBe("127.0.0.18");
	});

	it('should pass with the "x-forwarded" header', async () => {
		const response = await sendRequest("/", {
			"x-forwarded": "127.0.0.9",
		});

		expect(response.request.pre.remoteAddress).toBe("127.0.0.9");
	});

	it('should pass with the "forwarded-for" header', async () => {
		const response = await sendRequest("/", {
			"forwarded-for": "127.0.0.10",
		});

		expect(response.request.pre.remoteAddress).toBe("127.0.0.10");
	});

	it('should pass with the "forwarded" header', async () => {
		const response = await sendRequest("/", {
			forwarded: "127.0.0.11",
		});

		expect(response.request.pre.remoteAddress).toBe("127.0.0.11");
	});
});
