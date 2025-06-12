import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  CORS_ORIGIN: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_DATABASE: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    CORS_ORIGIN: joi.string().required(),
    DB_HOST: joi.string().required(),
    DB_PORT: joi.number().required(),
    DB_USERNAME: joi.string().required(),
    DB_PASSWORD: joi.string().required(),
    DB_DATABASE: joi.string().required(),
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
    host: envVars.DB_HOST,
    port: envVars.DB_PORT,
    username: envVars.DB_USERNAME,
    password: envVars.DB_PASSWORD,
    database: envVars.DB_DATABASE,
  },
};
