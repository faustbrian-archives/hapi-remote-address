import Joi from "@hapi/joi";

const headers = [
	"x-client-ip",
	"x-forwarded-for",
	"cf-connecting-ip",
	"fastly-client-ip",
	"true-client-ip",
	"x-real-ip",
	"x-cluster-client-ip",
	"x-forwarded",
	"forwarded-for",
	"forwarded",
];

export const schema = Joi.object({
	/**
	 * The headers that should be parsed.
	 */
	headers: Joi.array()
		.items(Joi.string())
		.valid(...headers)
		.default(headers),
});
