import { VALIDATION_CODES } from '@/services/validation/enums/codes';
import type { ServerValidationInfo } from '@/services/validation/providers/FormValidationProvider';
import type { ValidationDictionary } from '@/services/validation/types/validation';
import { analyzeValidationError } from '@/services/validation/usecase/errorMessage';
import type { z } from 'zod';

type ErrorResponse = {
  errorCode: string;
  message: string;
  validationInfos: ServerValidationInfo[];
};

const managerLastNameDictionaryTest: ValidationDictionary = {
  manager: {
    indices: {
      [VALIDATION_CODES.MAX_ARRAY_SIZE]: 3,
    },
    subEntries: {
      managerLastName: {
        name: '氏名',
        category: 'メインの担当者',
        indices: {
          [VALIDATION_CODES.REQUIRED]: '姓',
          [VALIDATION_CODES.INVALID_NAME]: undefined,
          [VALIDATION_CODES.MAX_SIZE]: 30,
        },
      },
    },
  },
};

const managerLastNameApiError: ErrorResponse['validationInfos'] = [
  {
    path: ['manager', 'managerLastName'],
    rejectedValue: '',
    message: 'REQUIRED',
  },
];

const managerLastNameZodIssue: z.ZodIssue[] = [
  {
    code: 'invalid_type',
    expected: 'string',
    received: 'undefined',
    path: ['manager', 'managerLastName'],
    message: 'REQUIRED',
  },
];

const managerLastNamePathIdMap = {
  'manager.managerLastName': '123',
};

const managerLastNameApiErrorMultiple: ErrorResponse['validationInfos'] = [
  {
    path: ['manager', '0', 'managerLastName'],
    rejectedValue: '',
    message: 'REQUIRED',
  },
];

const managerLastNameZodIssueMultiple: z.ZodIssue[] = [
  {
    code: 'invalid_type',
    expected: 'string',
    received: 'undefined',
    path: ['manager', 0, 'managerLastName'],
    message: 'REQUIRED',
  },
];

const managerLastNameMultiplePathIdMap = {
  'manager.0.managerLastName': '456',
};

describe('バリデーションエラー解析', () => {
  test('analyzeValidationError(マルチプルなし)', () => {
    const expectedValue = {
      id: '123',
      summary: 'メインの担当者の氏名',
      detail: '姓を入力してください。',
      path: ['manager', 'managerLastName'],
    };

    const messageByZodIssus = analyzeValidationError(
      managerLastNameDictionaryTest,
      managerLastNameZodIssue[0],
      managerLastNamePathIdMap,
    );
    const messageByApiError = analyzeValidationError(
      managerLastNameDictionaryTest,
      managerLastNameApiError[0],
      managerLastNamePathIdMap,
    );

    expect(messageByZodIssus).toEqual(expectedValue);

    expect(messageByApiError).toEqual(expectedValue);
  });

  test('analyzeValidationError(マルチプル)', () => {
    const expectedValue = {
      id: '456',
      summary: 'メインの担当者1の氏名',
      detail: '姓を入力してください。',
      path: ['manager', 0, 'managerLastName'],
    };

    const messageByApiError = analyzeValidationError(
      managerLastNameDictionaryTest,
      managerLastNameApiErrorMultiple[0],
      managerLastNameMultiplePathIdMap,
    );

    const messageByZodIssus = analyzeValidationError(
      managerLastNameDictionaryTest,
      managerLastNameZodIssueMultiple[0],
      managerLastNameMultiplePathIdMap,
    );

    expect(messageByZodIssus).toEqual(expectedValue);

    expect(messageByApiError).toEqual(expectedValue);
  });
});
