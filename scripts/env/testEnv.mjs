import { envSchema } from './schema.mjs';
import { envToObject } from './utils.mjs';

export const testEnv = (rawData) => {
  const env = envToObject(rawData);
  try {
    console.info('Test env');
    envSchema.parse(env);
    console.info('Success to test env');
  } catch (error) {
    console.error('Failed to test env:', error);
    throw error;
  }
};
