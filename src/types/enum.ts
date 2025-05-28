// 参考: https://typescriptbook.jp/reference/values-types-variables/enum/enum-problems-and-alternatives-to-enums
export type Enum<T extends object> = T[keyof T];
