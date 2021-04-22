import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const jsonFilePath1 = path.resolve(__dirname, '__fixtures__/file1.json');
const jsonFilePath2 = path.resolve(__dirname, '__fixtures__/file2.json');
const ymlFilePath1 = path.resolve(__dirname, '__fixtures__/file1.yml');
const ymlFilePath2 = path.resolve(__dirname, '__fixtures__/file2.yml');

const getResult = (format) => {
  const resultPath = path.resolve(__dirname, `__fixtures__/expected-${format}.txt`);
  return fs.readFileSync(resultPath, 'utf8');
};

describe.each`
  filePath1        | filePath2        | format       | expected
  ${jsonFilePath1} | ${jsonFilePath2} | ${'stylish'} | ${getResult('stylish')}
  ${ymlFilePath1}  | ${ymlFilePath2}  | ${'plain'}   | ${getResult('plain')}
  ${jsonFilePath1} | ${ymlFilePath2}  | ${'json'}    | ${getResult('json')}
`('$format format', (
  { filePath1, filePath2, format, expected }  
) => {
  test('gendiff', () => {
    expect(genDiff(filePath1, filePath2, format)).toBe(expected);
  });
});
