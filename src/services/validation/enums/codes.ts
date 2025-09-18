import type { Enum } from '@/types/enum';

/**
 * バリデーションエラーコード
 */
export const VALIDATION_CODES = {
  REQUIRED: 'REQUIRED',
  MAX_SIZE: 'MAX_SIZE',
  MIN_SIZE: 'MIN_SIZE',
  MAX_ARRAY_SIZE: 'MAX_ARRAY_SIZE',
  MIN_ARRAY_SIZE: 'MIN_ARRAY_SIZE',
  INVALID_PATTERN: 'INVALID_PATTERN',
  INVALID_PATTERN_PHONE: 'INVALID_PATTERN_PHONE',
  INVALID_PATTERN_EMAIL: 'INVALID_PATTERN_EMAIL',
  INVALID_PATTERN_URL: 'INVALID_PATTERN_URL',
  INVALID_PATTERN_POSTCODE: 'INVALID_PATTERN_POSTCODE',
  INVALID_NAME: 'INVALID_NAME',

  FE_ENUM_REQUIRED: 'FE_ENUM_REQUIRED',
  FE_MIN_CHECKBOX_GROUP_SIZE: 'FE_MIN_CHECKBOX_GROUP_SIZE',
  FE_HALF_WIDTH_NUMBERS: 'FE_HALF_WIDTH_NUMBERS',
} as const;

/**
 * バリデーションエラーコードの型
 */
export type ValidationCodes = Enum<typeof VALIDATION_CODES>;

export const toValidationMessage = (
  code: string | undefined,
  addon: string | number | undefined,
) => {
  switch (code) {
    case undefined:
      return '正しい形式で入力してください。';
    case VALIDATION_CODES.REQUIRED:
      return `${addon ?? '必須項目'}を入力してください。`;
    case VALIDATION_CODES.FE_ENUM_REQUIRED:
      return `${addon ?? '必須項目'}を選択してください。`;
    case VALIDATION_CODES.FE_MIN_CHECKBOX_GROUP_SIZE:
      return `${addon ?? '必須項目'}を${addon ?? 1}つ以上選択してください。`;
    case VALIDATION_CODES.MAX_SIZE:
      return `${addon ?? '項目'}は${addon ?? 255}文字以内で入力してください。`;
    case VALIDATION_CODES.MIN_SIZE:
      return `${addon ?? '項目'}は${addon ?? 1}文字以上で入力してください。`;
    case VALIDATION_CODES.MAX_ARRAY_SIZE:
      return `${addon ?? '項目'}は${addon ?? 5}個以内で入力してください。`;
    case VALIDATION_CODES.MIN_ARRAY_SIZE:
      return `${addon ?? '項目'}は${addon ?? 1}個以上で入力してください。`;
    case VALIDATION_CODES.INVALID_PATTERN:
      return `${addon ?? '正しい形式'}で入力してください。`;
    case VALIDATION_CODES.INVALID_PATTERN_PHONE:
      return '正しい電話番号の形式で入力してください。';
    case VALIDATION_CODES.INVALID_PATTERN_EMAIL:
      return '正しいメールアドレスの形式で入力してください。';
    case VALIDATION_CODES.INVALID_PATTERN_URL:
      return '正しいURLの形式で入力してください。';
    case VALIDATION_CODES.INVALID_PATTERN_POSTCODE:
      return '正しい郵便番号の形式で入力してください。';
    case VALIDATION_CODES.INVALID_NAME:
      return '正しい氏名の形式で入力してください。';
    case VALIDATION_CODES.FE_HALF_WIDTH_NUMBERS:
      return `${addon ?? '項目'}は半角数字で入力してください。`;
    default:
      return '正しい形式で入力してください。';
  }
};
