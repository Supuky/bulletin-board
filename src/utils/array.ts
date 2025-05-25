/**
 * 配列の最後の要素を取得する関数
 * @param array - 対象の配列
 * @returns 最後の要素
 */
export const getLast = <T>(array: T[]): T => {
  return array[array.length - 1];
};

/**
 * 配列の合計を計算する関数
 * @param array - 対象の配列
 * @returns 配列の合計値
 */
export const sumArray = (array: number[]): number => {
  return array.reduce((acc, cur) => acc + cur, 0);
};

/**
 * 配列の重複を削除する関数
 * @param array - 対象の配列
 * @returns 重複のない配列
 */
export const removeDuplicates = <T>(array: T[]): T[] => {
  return [...new Set(array)];
};

/**
 * 配列をシャッフルする関数
 * @param array - 対象の配列
 * @returns シャッフルされた配列
 */
export const shuffle = <T>(array: T[]): T[] => {
  return array.toSorted(() => Math.random() - 0.5);
};
