import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const commonPath = resolve('src/assets/styles/common');

const exportRegExp = /(?<=\:export\s{).*(?=})/;
const sassBuiltInValueRegExp = /(?<=\().*(?=\))/;
const sassUnquoteRegExp = /(?<=string\.unquote\().*(?=\))/;

const checkIsUnquoteNecessary = (value) => {
  return sassUnquoteRegExp.test(value);
};

const unquoteFirstAndLast = (value) => {
  return value.slice(1, -1);
};

const generateScssValueMatchRegExp = (key) => {
  return new RegExp(`(?<=\\\$${key}: ).*?(?=;)`, 'gm');
};

const findScssValue = (rawData, key) => {
  const value = rawData.match(generateScssValueMatchRegExp(key))[0];

  return value;
};

export const analysisModuleSass = (rawData) => {
  const withOutComment = rawData.replace(/\/\/.*/g, '');
  const withOutEmpty = withOutComment.replace(/^\s*$/gm, '');
  const withOutNewLine = withOutEmpty.replace(/\n/g, '');

  const exportData = withOutNewLine
    .match(exportRegExp)[0]
    .split(';')
    .reduce((acc, line) => {
      const [key, value] = line.split(':');
      if (key && value) {
        const timedKey = key.trim();
        let timedValue = value.trim();
        const isUnquoteNecessary = checkIsUnquoteNecessary(timedValue);

        if (timedValue.includes('(')) {
          timedValue = timedValue.match(sassBuiltInValueRegExp)[0];
        }

        const [, alias, subKey] = timedValue.match(/^\$([a-z]*)-([a-z\-]*)/);

        const aliasFile = readFileSync(`${commonPath}/_${alias}.scss`, 'utf-8');

        const subValue = findScssValue(aliasFile, subKey);

        acc[timedKey] =
          isUnquoteNecessary ? unquoteFirstAndLast(subValue) : subValue;
      }
      return acc;
    }, {});

  return exportData;
};
