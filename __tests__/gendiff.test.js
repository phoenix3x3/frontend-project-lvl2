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

// const PlainPath
const resultPath = path.resolve(__dirname, '__fixtures__/expectedStylishFormat.txt');
const resultPathPlain = path.resolve(__dirname, '__fixtures__/exptectedPlainFormat.txt');
const resultPathJson = path.resolve(__dirname, '__fixtures__/expectedJsonFormat.txt');
const result = fs.readFileSync(resultPath, 'utf8');
const resultPlain = fs.readFileSync(resultPathPlain, 'utf8');
const resultJson = fs.readFileSync(resultPathJson, 'utf8');

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
