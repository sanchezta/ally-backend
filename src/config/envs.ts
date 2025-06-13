import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  CORS_ORIGIN: string;
  DATABASE_URL: string
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    CORS_ORIGIN: joi.string().required(),
    DATABASE_URL: joi.string().required(),
  })
  .unknown(true);

const result = envsSchema.validate(process.env);

if (result.error) {
  throw new Error(`Config validation error: ${result.error.message}`);
}

const envVars: EnvVars = result.value as EnvVars;


export const envs = {
  port: envVars.PORT,
  corsOrigin: envVars.CORS_ORIGIN,
  db: {
    databaseUrls: envVars.DATABASE_URL
  },
};
