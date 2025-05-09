import { writeFileSync } from 'fs';
import path from 'path';
import { envToObject } from './utils.mjs';

const typeFileComment = `// このファイルはビルド時に自動生成されます`;

const generateType = (envObject) => {
  const interfaces = Object.keys(envObject).map((key) => {
    return `        readonly ${key}: string;`;
  });

  return `${typeFileComment}
declare module 'process' {
  global {
    namespace NodeJS {
      interface ProcessEnv {
${interfaces.join('\n')}
      }
    }
  }
}`;
};

export const createEnvTypeFile = (env) => {
  console.info('Create env.d.ts file');
  const rootPath = path.resolve();
  const filePath = `${rootPath}/env.d.ts`;
  console.info('File path:', filePath);

  const envObject = envToObject(env);

  const envType = generateType(envObject);

  try {
    writeFileSync(filePath, envType);
    console.info('env.d.ts file created successfully');
  } catch (error) {
    console.error('Failed to create env.d.ts file:', error);
    throw error;
  }
};
