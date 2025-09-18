import type {
  ValidationDictionary,
  ValidationMessageMap,
  ValidationResultMap,
} from '@/services/validation/types/validation';
import { analyzeValidationError } from '@/services/validation/usecase/errorMessage';
import type { FormValue } from '@/types/components';
import type { ReactNode } from 'react';
import { createContext, useCallback, useMemo, useRef, useState } from 'react';
import { isUndefined } from 'swr/_internal';
import type { SafeParseReturnType, z, ZodType } from 'zod';

// ! バックエンドが返すバリデーションエラーの型
export type ServerValidationInfo = {
  // message: Omit<
  //   ValidationCodes,
  //   'FE_ENUM_REQUIRED' | 'FE_MIN_CHECKBOX_GROUP_SIZE' | 'FE_HALF_WIDTH_NUMBERS'
  // >;
  message: string;
  path: string[];
  rejectedValue: string;
};

type Props = {
  children: ReactNode;
};

type FormValidationContextValue = {
  analyzeSeverValidationError?: (
    serverIssues: ServerValidationInfo[],
    dictionary: ValidationDictionary,
  ) => void;
  formDataTimestamps: Record<string, number | undefined>;
  registerValidationPathIdMap: (map: Record<string, string>) => void;
  removeValidationPathIdMapItems: (paths: string[]) => void;
  resetFormValidation: () => void;
  updateFormItemTimestamp: (id: string | undefined) => void;
  validateForm?: <Output>(
    data: FormValue,
    schema: ZodType,
    dictionary: ValidationDictionary,
  ) => SafeParseReturnType<unknown, Output>;
  validatedTimestamp: number;
  validationMessages: Exclude<ValidationMessageMap, undefined>[];
  validationResultMap: ValidationResultMap;
};

export const FormValidationContext = createContext<FormValidationContextValue>({
  formDataTimestamps: {},
  updateFormItemTimestamp: () => {},
  registerValidationPathIdMap: () => {},
  removeValidationPathIdMapItems: () => {},
  validatedTimestamp: Date.now(),
  resetFormValidation: () => {},
  validationResultMap: {},
  validationMessages: [],
});

export const FormValidationProvider = ({ children }: Props) => {
  const validationPathIdMap = useRef<Record<string, string>>({});

  const [formDataTimestamps, setFormDataTimestamps] = useState<
    Record<string, number | undefined>
  >({});
  const [validationMessages, setValidationMessages] = useState<
    Exclude<ValidationMessageMap, undefined>[]
  >([]);

  const [validatedTimestamp, setValidatedTimestamp] = useState<number>(0);

  const validationResultMap = useMemo<ValidationResultMap>(() => {
    const result = validationMessages.reduce((acc, cur) => {
      const isInvalid = (formDataTimestamps[cur.id] ?? 0) < validatedTimestamp;
      if (isInvalid) {
        return {
          ...acc,
          [cur.id]: {
            detail: cur.detail,
            summary: cur.summary,
            path: cur.path,
          },
        };
      }
      return acc;
    }, {});

    return result;
  }, [formDataTimestamps, validatedTimestamp, validationMessages]);

  const updateFormItemTimestamp = (id: string | undefined) => {
    if (isUndefined(id)) return;
    setFormDataTimestamps((prev) => ({ ...prev, [id]: Date.now() }));
  };

  const generateValidationMessages = (
    dictionary: ValidationDictionary,
    issues: ServerValidationInfo[] | z.ZodIssue[],
  ) => {
    const messages = issues.reduce<Exclude<ValidationMessageMap, undefined>[]>(
      (acc, issue) => {
        const message = analyzeValidationError(
          dictionary,
          issue,
          validationPathIdMap.current,
        );

        return isUndefined(message) ? acc : [...acc, message];
      },
      [],
    );

    setValidationMessages(messages);
  };

  const validateForm = useCallback(
    <Output,>(
      data: FormValue,
      schema: ZodType<Output>,
      dictionary: ValidationDictionary,
    ): SafeParseReturnType<unknown, Output> => {
      const result = schema.safeParse(data);

      if (result.success) {
        setValidationMessages([]);
        return result;
      }
      setValidatedTimestamp(Date.now());

      generateValidationMessages(dictionary, result.error.issues);

      return result;
    },
    [],
  );

  const analyzeSeverValidationError = useCallback(
    (
      serverIssues: ServerValidationInfo[],
      dictionary: ValidationDictionary,
    ) => {
      setValidatedTimestamp(Date.now());
      generateValidationMessages(dictionary, serverIssues);
    },
    [],
  );

  const registerValidationPathIdMap = (map: Record<string, string>) => {
    validationPathIdMap.current = {
      ...validationPathIdMap.current,
      ...map,
    };
  };

  const removeValidationPathIdMapItems = (paths: string[]) => {
    paths.forEach((path) => {
      delete validationPathIdMap.current[path];
    });
  };

  const resetFormValidation = () => {
    setFormDataTimestamps({});
    validationPathIdMap.current = {};
    setValidatedTimestamp(Date.now());
    setValidationMessages([]);
  };

  const value = useMemo<FormValidationContextValue>(() => {
    return {
      validationResultMap,
      formDataTimestamps,
      updateFormItemTimestamp,
      validateForm,
      validatedTimestamp,
      registerValidationPathIdMap,
      removeValidationPathIdMapItems,
      resetFormValidation,
      validationMessages,
      analyzeSeverValidationError,
    };
  }, [
    analyzeSeverValidationError,
    formDataTimestamps,
    validateForm,
    validatedTimestamp,
    validationMessages,
    validationResultMap,
  ]);

  return (
    <FormValidationContext.Provider value={value}>
      {children}
    </FormValidationContext.Provider>
  );
};
