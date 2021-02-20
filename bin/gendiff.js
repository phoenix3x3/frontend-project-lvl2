#!/usr/bin/env node
const program = require('commander');
const fs = require('fs');
const _ = require('lodash');

const printResult = (arr) => {
  console.log('{');
  arr.forEach((el) => console.log(`  ${el}`));
  console.log('}');
};

program
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .action(() => {
    const firstObj = JSON.parse(fs.readFileSync(`${program.args[0]}`, 'utf-8'));
    const secondObj = JSON.parse(fs.readFileSync(`${program.args[1]}`, 'utf-8'));
    const result = [];
    for (let key in firstObj) {
      if (secondObj.hasOwnProperty(key)) {
        if (secondObj[key] === firstObj[key]) {
          result.push(`  ${key}: ${firstObj[key]}`);
        } else {
          result.push(`- ${key}: ${firstObj[key]}`);
          result.push(`+ ${key}: ${secondObj[key]}`);
        }
      } else {
        result.push(`- ${key}: ${firstObj[key]}`);
      }
    }
    for (let key in secondObj) {
      if (!firstObj.hasOwnProperty(key)) {
        result.push(`+ ${key}: ${secondObj[key]}`);
      }
    }
    const sortedColl = _.sortBy(result, [(str) => str.slice(1).split(' ')[1]]);
    printResult(sortedColl);
  });

program.parse(process.argv);
