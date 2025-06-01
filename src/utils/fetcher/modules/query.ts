import { isUndefined } from '@/utils/typeGuards';
import type { BooleanOptional, IStringifyOptions } from 'qs';
import { stringify } from 'qs';

export const queryParamsStringfy = (
  params: object,
  options: IStringifyOptions<BooleanOptional>,
) => {
  return stringify(params, options);
};

export const generateQueryParams = (
  params?: object,
  arrayOptions: 'repeat' | 'indices' | 'brackets' | 'comma' = 'comma',
) => {
  return isUndefined(params) ? '' : (
      `?${queryParamsStringfy(params, { arrayFormat: arrayOptions })}`
    );
};
