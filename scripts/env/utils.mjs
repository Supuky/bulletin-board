// envファイルをobjectに変換する関数
export const envToObject = (rawData) => {
  const rawLines = rawData.split('\n').filter((line) => {
    // 空行とコメント行を除外
    const isNotComment = !line.startsWith('#');
    const isNotEmpty = line.trim() !== '';
    return isNotComment && isNotEmpty;
  });

  const envObject = rawLines.reduce((acc, line) => {
    const [key, value] = line.split('=');
    return { ...acc, [key]: value };
  }, {});
  return envObject;
};
