import fs from 'node:fs';
import path from 'node:path';

const banner = '//! npm run dev実行時に自動で生成されます。';

const generateType = (moduleName, type) => {
  const types = Object.entries(type).reduce((acc, [key, value]) => {
    return `${acc}  ${key}: '${value}';\n`;
  }, '');

  return `${banner}\n\ndeclare const ${moduleName}: {\n${types}\};\n\nexport default ${moduleName}`;
};

export const createTypeFile = (moduleName, type) => {
  const typeData = generateType(moduleName, type);
  const enumsPath = path.resolve('src/assets/styles/common');
  fs.writeFileSync(`${enumsPath}/${moduleName}.module.scss.d.ts`, typeData);
};
