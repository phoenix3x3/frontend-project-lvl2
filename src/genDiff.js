import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import parsers from './parsers/parser.js';
import format from './formaters/index.js';

const getObject = (config) => {
  const filePath = path.resolve(config);
  const extension = path.extname(config);
  const data = fs.readFileSync(filePath, 'utf8');
  return parsers(data, extension);
};

const buildTree = (obj1, obj2) => {
  const keysFromObj1 = Object.keys(obj1);
  const keysFromObj2 = Object.keys(obj2);

  const uniqKeys = _.union(keysFromObj1, keysFromObj2);
  const sortedKeys = _.sortBy(uniqKeys);

  const diff = sortedKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return {
        key,
        type: 'nested',
        children: buildTree(value1, value2),
      };
    }
    if (!_.has(obj1, key)) {
      return {
        key,
        type: 'added',
        value: value2,
      };
    }
    if (!_.has(obj2, key)) {
      return {
        key,
        type: 'removed',
        value: value1,
      };
    }
    if (_.isEqual(value1, value2)) {
      return {
        key,
        type: 'equal',
        value: value1,
      };
    }
    return {
      key,
      type: 'replaced',
      oldValue: value1,
      newValue: value2,
    };
  });
  return diff;
};

const genDiff = (firstConfig, secondConfig, dataFormat = 'stylish') => {
  const obj1 = getObject(firstConfig);
  const obj2 = getObject(secondConfig);
  const result = buildTree(obj1, obj2);
  return format(result, dataFormat);
};

export default genDiff;
