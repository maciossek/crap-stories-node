import Joi from "@hapi/joi";
import packageJson from "../../package.json";

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string().default("development"),
  PORT: Joi.number().default(3001),
  LOG_LEVEL: Joi.string().default("debug"),
  SOURCE_VERSION: Joi.string().default(process.env.HEROKU_SLUG_COMMIT ? process.env.HEROKU_SLUG_COMMIT.substring(0, 7) : "?????"),
  DB_HOST: Joi.string(),
  CORS_URLS: Joi.string().default("https://app.neurolabs.ai"),
  JWKS_URI: Joi.string(),
})
  .unknown()
  .required();

const { error, value: envVars } = envVarsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  version: packageJson.version,
  commitHash: envVars.SOURCE_VERSION,
  dbHost: envVars.DB_HOST,
  logLevel: envVars.LOG_LEVEL,
  corsUrls: envVars.CORS_URLS.split(" "),
  jwksUri: envVars.JWKS_URI,
};

export default config;
