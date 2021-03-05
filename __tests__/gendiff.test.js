import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { genDiff } from '../src/app';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filepath1 = path.resolve(__dirname, '__fixtures__/file1.json');
const filepath2 = path.resolve(__dirname, '__fixtures__/file2.json');
const filepath3 = path.resolve(__dirname, '__fixtures__/file3.txt');
const result = fs.readFileSync(filepath3, 'utf8');

test('genDiff #1', () => {
  expect(genDiff(filepath1, filepath2)).toEqual(result);
});
