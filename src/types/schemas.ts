import type { ZodType } from 'zod';

export type ShemaTestCase = {
  expect: boolean;
  name: string;
  value: unknown;
};

export type SchemaTestDescribe = {
  case: ShemaTestCase[];
  name: string;
  schema: ZodType;
};
