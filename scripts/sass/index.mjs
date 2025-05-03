import fs from 'node:fs';
import path from 'node:path';
import { analysisModuleSass } from './analysisSass.mjs';
import { createTypeFile } from './generateType.mjs';

const [, , ...args] = process.argv;

const isWatch = args.includes('--watch');

const enumsPath = path.resolve('src/assets/styles/common');

// src/assets/styles/common 直下の全ディレクトリを取得
const allDirects = fs.readdirSync(enumsPath, { withFileTypes: true });
// ファイルのみを取得
const allFiles = allDirects
  .filter((dirent) => dirent.isFile())
  .map((dirent) => dirent.name);
// sassファイルのみを取得
const scssEnumFiles = allFiles.filter((file) => file.endsWith('.module.scss'));

const generateScssFilePath = (file) => `${enumsPath}/${file}`;

const execute = (file, scssFilePath) => {
  console.group('Start to generate type file');
  console.log(`Start to analysis Sass file: ${scssEnumFiles}`);
  const exportData = analysisModuleSass(fs.readFileSync(scssFilePath, 'utf-8'));
  const fileName = file.match(/^\_?([A-z0-9]*)(\.module)?\.scss$/)[1];
  if (Object.keys(exportData).length === 0) {
    console.groupEnd('No export data');
    return;
  }
  console.log(`Start to generate type file: ${fileName}`);
  createTypeFile(fileName, exportData);
  console.groupEnd();
  console.info('End to generate type file\n');
};

scssModuleFiles.forEach((file) => {
  const scssFilePath = generateScssFilePath(file);
  execute(file, scssFilePath);
});

if (!isWatch) {
  process.exit(0);
}

console.info('Start to watch Sass file');

Promise.all(
  scssEnumFiles.map((file) => {
    const scssFilePath = generateScssFilePath(file);
    fs.watchFile(scssFilePath, { interval: 1000 }, () => {
      console.group('Sass File changed:', scssFilePath);
      execute(file, scssFilePath);
      console.groupEnd();
    });
  }),
);
