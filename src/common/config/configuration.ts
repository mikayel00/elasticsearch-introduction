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
  // Yandex S3
  S3_ACCESS_KEY: Joi.string().required(),
  S3_SECRET_ACCESS_KEY: Joi.string().required(),
  S3_BUCKET_NAME: Joi.string().required(),
  S3_ENDPOINT: Joi.string().required(),
  S3_REGION: Joi.string().required(),
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
  s3: {
    region: process.env.S3_REGION,
    endpoint: process.env.S3_ENDPOINT,
    accessKey: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    bucketName: process.env.S3_BUCKET_NAME,
  },
});

export const validationOptions: BaseValidationOptions = {
  abortEarly: false,
  convert: true,
};
