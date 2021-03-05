import program from 'commander';
import path from 'path';
import fs from 'fs';
import _ from 'lodash';
// const fs = require('fs');
// const _ = require('lodash');

const genDiff = (firstConfig, secondConfig) => {
  const filepath1 = path.resolve(firstConfig);
  const filepath2 = path.resolve(secondConfig);
  const json1 = fs.readFileSync(filepath1, 'utf8');
  const json2 = fs.readFileSync(filepath2, 'utf8');
  const obj1 = JSON.parse(json1);
  const obj2 = JSON.parse(json2);
  const keys = _.union(_.keys(obj1), _.keys(obj2));

  const func = (item) => {
    if (obj1[item] === obj2[item]) {
      return `    ${item}: ${obj1[item]}\n`;
    }
    if (_.has(obj1, item) && !_.has(obj2, item)) {
      return `  - ${item}: ${obj1[item]}\n`;
    }
    if (!_.has(obj1, item) && _.has(obj2, item)) {
      return `  + ${item}: ${obj2[item]}\n`;
    }
    return `  - ${item}: ${obj1[item]}\n  + ${item}: ${obj2[item]}\n`;
  };
  const str = _.map(keys, func);
  const sortedStr = _.sortBy(str, [(el) => el.slice(3).split(' ')[1]]).join('');
  return `{\n${sortedStr}}\n`;
};
const app = () => {
  program
    .version('0.0.1')
    .arguments('<filepath1> <filepath2>')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'output format')
    .action((filepath1, filepath2) => {
      console.log(genDiff(filepath1, filepath2));
    });

  program.parse(process.argv);
};

export { genDiff, app };
