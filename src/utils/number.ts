/**
 * Number型に変換する関数
 * @param value - 変換対象の文字列
 * @returns Numberに変換された値
 */
export const toNumber = (value: string) => {
  return Number(value);
};

export const isNumericString = (value: string): value is string => {
  return /^[0-9]+$/.test(value);
};
