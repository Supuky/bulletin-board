/**
 * Number型に変換する関数
 * @param value - 変換対象の文字列
 * @returns Numberに変換された値
 */
export const toNumber = (value: string) => {
  return Number(value);
};

/**
 * 数値が0以上かどうかを判定する関数
 * @param value - 対象の数値
 * @returns 0以上ならtrue、そうでなければfalse
 */
export const isNumericString = (value: string): value is string => {
  return /^[0-9]+$/.test(value);
};
