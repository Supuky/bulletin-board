import fs from 'node:fs';

const banner = '//! npm run dev実行時に自動で生成されます。';

const generateType = (moduleName, type) => {
  const types = Object.entries(type).reduce((acc, [key, value]) => {
    return `${acc}  ${key}: ${value};\n`;
  }, '');

  return `${banner}\n\ndeclare const ${moduleName}: {\n${types}\};\n\nexport default ${moduleName}`;
};

export const createTypeFile = (moduleName, type) => {
  const typeData = generateType(moduleName, type);
  const enumsPath = resolve('src/assets/styles/common');
  fs.writeFileSync(`${enumsPath}/_${moduleName}.d.ts`, typeData);
};
