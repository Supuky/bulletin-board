import type { ZodTypeAny } from 'zod';
import { z } from 'zod';

export const commaStringArraySchema = <T extends ZodTypeAny>(schema: T) => {
  return z.preprocess((value) => {
    if (typeof value === 'string') {
      return value.split(',');
    }

    return value;
  }, z.array(schema));
};

export const generateZodQueryArraySchema = <I extends ZodTypeAny>(
  schema: I,
) => {
  return z.preprocess((value) => {
    if (typeof value === 'string') {
      return [value];
    }

    return value;
  }, schema);
};

// TODO: serviceフォルダーでoptionsを作成
export const zodStringWithBackslash = ({
  max,
  min = 1,
  // options = {

  // }
}: {
  max: number;
  min?: number;
  // options?: {}
}) => {};
