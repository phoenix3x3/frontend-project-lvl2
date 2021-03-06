import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { genDiff } from '../src/app';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filepath1 = path.resolve(__dirname, '__fixtures__/file1.json');
const filepath2 = path.resolve(__dirname, '__fixtures__/file2.json');
const filepath3 = path.resolve(__dirname, '__fixtures__/file1.yml');
const filepath4 = path.resolve(__dirname, '__fixtures__/file2.yml');
const resultpath = path.resolve(__dirname, '__fixtures__/file3.txt');
const result = fs.readFileSync(resultpath, 'utf8');

test('genDiff json', () => {
  expect(genDiff(filepath1, filepath2)).toBe(result);
});
test('genDiff yml', () => {
  expect(genDiff(filepath3, filepath4)).toBe(result);
});
