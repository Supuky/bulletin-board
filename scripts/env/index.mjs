import { readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { createEnvTypeFile } from './createEnvTypeFile.mjs';
import { testEnv } from './testEnv.mjs';

const envComment =
  '# !このファイルを直接編集しないでください！\n# !このファイルは、ビルド時にscripts/env/index.mjs から自動生成されます。\n';

const createEnvFile = (env) => {
  console.info('Create .env file');
  const filePath = `${path.resolve()}/.env`;
  console.info('File path:', filePath);
  try {
    writeFileSync(filePath, env);
    console.info('Env file created successfully');
  } catch (error) {
    console.error('Failed to create .env file:', error);
    throw error;
  }
};

const getArgv = () => {
  const [, , ...argVs] = process.argv;
  const args = argVs.reduce((acc, arg) => {
    const [key, value] = arg.split('=');
    return { ...acc, [key]: value };
  }, {});
  return args;
};

const loadEnv = () => {
  console.group('Load env');
  const appEnv = getArgv()['--mode'];
  // npm run start の場合は、envを作成する必要がないため、処理をスキップ
  if (typeof appEnv === 'undefined') {
    return;
  }
  const specificEnvPath = path.resolve(`.env.${appEnv}`);
  const specificEnvFile = readFileSync(specificEnvPath, 'utf-8');

  const commonEnvPath = path.resolve('.env.common');
  const commonEnvFile = readFileSync(commonEnvPath, 'utf-8');

  const envFile = `${commonEnvFile}\n${specificEnvFile}`;

  testEnv(envFile);

  const env = `${envComment}\nNEXT_PUBLIC_APP_ENV=${appEnv}\nAPP_ENV=${appEnv}\n\n${envFile}`;
  createEnvFile(env);
  createEnvTypeFile(env);
  console.groupEnd();
};

loadEnv();
