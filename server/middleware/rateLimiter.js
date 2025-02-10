const rateLimit = require("express-rate-limit");

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
const MAX_REQUESTS_PER_DAY = 5;

const rateLimiterUsingThirdParty = rateLimit({
  windowMs: ONE_DAY_IN_MS,
  max: MAX_REQUESTS_PER_DAY,
  message: `You have exceeded the ${MAX_REQUESTS_PER_DAY} requests in 24 hrs limit!`,
  standardHeaders: true,
  legacyHeaders: false,
});
module.exports = { rateLimiterUsingThirdParty };
