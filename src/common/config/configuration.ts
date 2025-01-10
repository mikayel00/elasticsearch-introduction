import * as process from 'node:process';

import * as Joi from 'joi';
import { BaseValidationOptions } from 'joi';

export enum AppEnvironment {
  PRODUCTION = 'production',
}

export const schema = Joi.object({
  // Server
  PORT: Joi.number().required(),
  // App
  ENV: Joi.string().valid(AppEnvironment.PRODUCTION).required(),
  // Database
  DB_HOST: Joi.string().hostname().required(),
  DB_PORT: Joi.number().port().required(),
  DB_NAME: Joi.string().required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().required(),
  // Jwt
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().required(),
  // Elasticsearch
  ELASTICSEARCH_NODE: Joi.string().uri(),
  ELASTICSEARCH_USERNAME: Joi.string(),
  ELASTICSEARCH_PASSWORD: Joi.string(),
});

export const configuration = () => ({
  app: {
    environment: process.env.ENV,
    port: parseInt(process.env.PORT, 10),
  },
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '', 10),
    name: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  elastic: {
    node: process.env.ELASTICSEARCH_NODE,
    username: process.env.ELASTICSEARCH_USERNAME,
    password: process.env.ELASTICSEARCH_PASSWORD,
  },
});

export const validationOptions: BaseValidationOptions = {
  abortEarly: false,
  convert: true,
};
