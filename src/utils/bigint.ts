/**
 * BigIntに変換する関数
 * @param value - 変換対象の文字列
 * @returns BigIntに変換された値
 */
export const toBigInt = (value: string) => {
  if (value.length === 0) {
    return BigInt(0);
  }

  try {
    return BigInt(value);
  } catch {
    console.error(`Invalid BigInt value: ${value}`);
    return BigInt(0);
  }
};

/**
 * BigIntの絶対値を取得する関数
 * @param value - 対象のBigInt値
 * @returns 絶対値
 */
export const absBigInt = (value: bigint) => {
  return value < BigInt(0) ? -value : value;
};

// export const toJpunitedNumber = (value: bigint) => {
//   const jpUnitDivider = BigInt(10000);
//   const bigintZero = BigInt(0);

//   const sign = value < bigintZero ? '-' : '';

//   const absoluteValue = absBigInt(value);

//   if(absoluteValue === bigintZero) {
//     return '0';
//   }

//   let result = '';

// };
