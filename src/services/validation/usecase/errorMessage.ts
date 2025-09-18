import { toValidationMessage } from '@/services/validation/enums/codes';
import type { ServerValidationInfo } from '@/services/validation/providers/FormValidationProvider';
import type {
  ValidationDictionary,
  ValidationMessageMap,
} from '@/services/validation/types/validation';

import { isNumericString } from '@/utils/number';
import { isEmptyString } from '@/utils/string';
import { isUndefined } from 'swr/_internal';
import type { z } from 'zod';

export const analyzeValidationError = (
  dictionary: ValidationDictionary,
  error: ServerValidationInfo | z.ZodIssue,
  pathIdMap: Record<string, string>,
): ValidationMessageMap => {
  const { path, message } = error;

  const {
    summary,
    detail,
    path: parsedPath,
  } = path.reduce<{
    detail: string;
    dictionary: ValidationDictionary | undefined;
    path: (string | number)[];
    prevIndex: number | undefined;
    summary: string;
  }>(
    (acc, cur, index) => {
      if (typeof cur === 'number' || isNumericString(cur)) {
        const numberedCur = Number(cur);
        return {
          ...acc,
          prevIndex: numberedCur + 1,
          path: [...acc.path, numberedCur],
        };
      }

      const currentDictionary = acc.dictionary?.[cur];

      const currentSummary =
        isUndefined(currentDictionary?.name) ? '' : (
          `${isEmptyString(acc.summary) ? '' : 'の'}${isUndefined(currentDictionary?.category) ? '' : `${currentDictionary?.category}${acc.prevIndex ?? ''}の`}${currentDictionary.name}`
        );
      const currentDetail =
        index === path.length - 1 ?
          toValidationMessage(message, currentDictionary?.indices?.[message])
        : '';

      return {
        summary: `${acc.summary}${currentSummary}`,
        detail: `${acc.detail}${currentDetail}`,
        dictionary: currentDictionary?.subEntries,
        prevIndex: undefined,
        path: [...acc.path, cur],
      };
    },
    {
      summary: '',
      detail: '',
      dictionary,
      prevIndex: undefined,
      path: [],
    },
  );

  const stringPath = path.join('.');

  const id = pathIdMap[stringPath];

  if (isUndefined(id)) {
    return undefined;
  }

  return {
    summary,
    detail,
    path: parsedPath,
    id,
  };
};
