import fs from 'node:fs';
import path from 'node:path';

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

// src/assets/styles/common 直下の全ディレクトリを取得
const allDirects = fs.readdirSync(enumPath, { withFileTypes: true });
// ファイルのみを取得
const allFiles = allDirects
  .filter((dirent) => dirent.isFile())
  .map((dirent) => dirent.name);
// sassファイルのみを取得
const scssEnumFiles = allFiles.filter(
  (file) =>
    file.endsWith('.scss') &&
    !file.endsWith('.module.scss') &&
    file !== 'bootstrap.scss',
);

const convertScssEnumFileNameToScssForward = (fileName) => {
  const matchedFileName = fileName.match(
    /^\_?([A-z0-9\-]*)(\.module)?\.scss$/,
  )[1];
  return `@forward 'src/assets/styles/common/${matchedFileName}' as ${matchedFileName}-*;`;
};

const scssForward = scssEnumFiles.map(convertScssEnumFileNameToScssForward);

fs.writeFileSync(`${enumPath}/bootstrap.scss`, scssForward.join('\n'), 'utf-8');

// TODO @use形式に変更

const scssArgumentsFiles = [];

const scanAllDirectoriesScssArgsFile = (dirPath) => {
  const files = fs.readdirSync(dirPath, { withFileTypes: true });
  files.forEach((file) => {
    if (file.isDirectory()) {
      scanAllDirectoriesScssArgsFile(`${dirPath}/${file.name}`);
      return;
    }
    if (file.isFile() && file.name === '_arguments.scss') {
      scssArgumentsFiles.push(`${dirPath}/${file.name}`);
    }
  });
};

// TODO ディレクトリを作成後コメント解除
// scanAllDirectoriesScssArgsFile(`${srcPath}/components`);
// scanAllDirectoriesScssArgsFile(`${srcPath}/containeers`);
// scanAllDirectoriesScssArgsFile(`${srcPath}/features`);

const scssArgumentsUses = scssArgumentsFiles.map((file) => {
  const parentFolderName = path.basename(path.dirname(file));
  const snakedParentFolderName = toSnakeCase(parentFolderName);

  return `@use '${file}' as ${snakedParentFolderName}`;
});

if (checkDuplicate(scssArgumentsUses)) {
  throw new Error('scssArgumentsUsesに重複があります');
}

const scssUses = [
  `@use 'src/assets/styles/common/bootstrap' as *`,
  ...scssArgumentsUses,
].join('\n');

console.log('scssUses:', scssUses);

export default {
  additionalData: scssUses,
};
