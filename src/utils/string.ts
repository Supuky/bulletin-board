/**
 * 文字列が空であるかどうかを判定する関数
 * @param value - 変換対象の文字列
 * @returns {boolean} - 文字列が空であればtrue、そうでなければfalse
 */
export const isEmptyString = (value: string) => value === '';

/**
 * 文字列の長さを取得する関数
 * @param value - 変換対象の文字列
 * @returns {boolean} - 文字列が空でなければtrue、そうでなければfalse
 */
export const countStringWithBackSlash = (value: string) => {
  // return (value.match(/\\/g) || []).length;
  return JSON.stringify(value).length - 2; // 文字列をJSON形式に変換して、前後のダブルクォーテーションを除外
};
