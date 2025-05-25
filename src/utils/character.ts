/**
 * 全角英数字を半角に変換する関数
 * @param str - 変換対象の文字列
 * @returns 半角に変換された文字列
 */
export function toHalfWidth(text: string): string {
  return text.replace(/[Ａ-Ｚａ-ｚ０-９]/g, (s) => {
    return String.fromCharCode(s.charCodeAt(0) - 0xfee0);
  });
}
