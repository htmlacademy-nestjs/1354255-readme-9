import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

const DEFAULT_PORT = 3000;
const ENVIRONMENTS = ['development', 'production', 'stage'] as const;
const GLOBAL_PREFIX = 'api';

type Environment = typeof ENVIRONMENTS[number];

export interface ApplicationConfig {
  environment: string;
  port: number;
  globalPrefix: string;
}

const validationSchema = Joi.object({
  environment: Joi.string().valid(...ENVIRONMENTS).required(),
  port: Joi.number().port().default(DEFAULT_PORT),
  globalPrefix: Joi.string().default(GLOBAL_PREFIX)
});

function validateConfig(config: ApplicationConfig): void {
  const { error } = validationSchema.validate(config, { abortEarly: true });
  if (error) {
    throw new Error(`[Application Config Validation Error]: ${error.message}`);
  }
}

function getConfig(): ApplicationConfig {
  const config: ApplicationConfig = {
    environment: process.env.NODE_ENV as Environment,
    port: parseInt(process.env.PORT || `${DEFAULT_PORT}`, 10),
    globalPrefix: GLOBAL_PREFIX
  };

  validateConfig(config);
  return config;
}

export default registerAs('application', getConfig);
