export const generateExcludeRegex = (excludePaths: string[]) => {
  const excludePathsRegex = excludePaths.map((path) => `(${path})`).join('|');
  return new RegExp(`^(?!${excludePathsRegex}).*$`);
};
