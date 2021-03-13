import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filepath1 = path.resolve(__dirname, '__fixtures__/file1.json');
const filepath2 = path.resolve(__dirname, '__fixtures__/file2.json');
const filepath3 = path.resolve(__dirname, '__fixtures__/file1.yml');
const filepath4 = path.resolve(__dirname, '__fixtures__/file2.yml');

const resultpath = path.resolve(__dirname, '__fixtures__/file3.txt');
const resultpathPlain = path.resolve(__dirname, '__fixtures__/file3plain.txt');
const resultpathJson = path.resolve(__dirname, '__fixtures__/file3json.txt');
const result = fs.readFileSync(resultpath, 'utf8');
const resultPlain = fs.readFileSync(resultpathPlain, 'utf8');
const resultJson = fs.readFileSync(resultpathJson, 'utf8');

test('genDiff json', () => {
  expect(genDiff(filepath1, filepath2)).toBe(result);
});
test('genDiff yml', () => {
  expect(genDiff(filepath3, filepath4)).toBe(result);
});
test('genDiff json plainFormat', () => {
  expect(genDiff(filepath1, filepath4, 'plain')).toBe(resultPlain);
});
test('genDiff json jsonFormat', () => {
  expect(genDiff(filepath3, filepath2, 'json')).toBe(resultJson);
});
test('genDiff yml jsonFormat', () => {
  expect(genDiff(filepath3, filepath4, 'json')).toBe(resultJson);
});
