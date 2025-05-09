import { z } from 'zod';

const noEndsWithSlash = (url) => !url.endsWith('/');

const commonEnvSchema = z
  .object({
    ACCESS_TOKEN_MAX_AGE: z.string().regex(/^\d+$/),
    REFRESH_TOKEN_MAX_AGE: z.string().regex(/^\d+$/),
  })
  .strict();

const specificEnvSchema = z
  .object({
    NEXT_PUBLIC_HOST: z.string().url().refine(noEndsWithSlash),
    BACKEND_API_ENDPOINT: z.string().url().refine(noEndsWithSlash),
    // NEXT_PUBLIC_GTM_ID: z.string()
  })
  .strict();

export const envSchema = commonEnvSchema.merge(specificEnvSchema);
