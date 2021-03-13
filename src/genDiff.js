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

const buildTree = (data1, data2) => {
  const keys = _.union(_.keys(data1), _.keys(data2));
  const func = (key) => {
    const value1 = data1[key];
    const value2 = data2[key];
    if (value1 instanceof Object && value2 instanceof Object) {
      return { type: 'compared', key, currentValue: buildTree(value1, value2) };
    }
    if (value1 instanceof Object && !value2) {
      return { type: 'removed', key, currentValue: buildTree(value1, value1) };
    }
    if (!value1 && value2 instanceof Object) {
      return { type: 'added', key, currentValue: buildTree(value2, value2) };
    }
    if (_.has(data1, key) && !_.has(data2, key)) {
      return { type: 'removed', key, removedValue: value1 };
    }

    if (!_.has(data1, key) && _.has(data2, key)) {
      return { type: 'added', key, currentValue: value2 };
    }

    if (value1 === value2) {
      return {
        type: 'equal',
        key,
        currentValue: value1,
      };
    }
    return {
      type: 'replaced',
      key,
      removedValue: value1,
      currentValue: value2,
    };
  };
  return keys.map(func);
};

const genDiff = (firstConfig, secondConfig, dataFormat = 'stylish') => {
  const obj1 = getObject(firstConfig);
  const obj2 = getObject(secondConfig);
  const result = buildTree(obj1, obj2);
  return format(result, dataFormat);
};

export default genDiff;
