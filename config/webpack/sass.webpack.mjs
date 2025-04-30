import fs from 'fs';
import path from 'path';

const toSnakeCase = (str) => {
  str
    .replace(/([A-Z])/g, (match) => `-${match[0].toLowerCase()}`)
    .replace(/^-/, '');
};

const checkDuplicate = (array) => {
  const set = new Set(array);
  return set.size !== array.length;
};

const srcPath = path.resolve('src');

const enumPath = `${srcPath}/assets/styles/common`;

// src/assets/styles/common 直下の前ディレクトリを取得
const allDirects = fs.readFileSync(enumPath, { withFileTypes: true });
