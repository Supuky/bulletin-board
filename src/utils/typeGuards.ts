/**
 * 値がUndefinedかどうかを判定する関数
 * @param value - 変換対象の値
 * @returns 値がundefinedであればtrue、そうでなければfalse
 */
export const isUndefined = (value: unknown): value is undefined => {
  return typeof value === 'undefined';
};

/**
 * 値がNullかどうかを判定する関数
 * @param value - 変換対象の値
 * @returns 値がnullであればtrue、そうでなければfalse
 */
export const isNull = (value: unknown): value is null => {
  return value === null;
};

/**
 * 値がUndefinedでもNullでもないかどうかを判定する関数
 * @param value - 変換対象の値
 * @returns 値がundefinedでもnullでもない場合にtrueを返す
 */
export const isExist = <T>(value: T): value is NonNullable<T> => {
  return !isUndefined(value) && !isNull(value);
};
