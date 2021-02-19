#!/usr/bin/env node
const program = require('commander');

program
  .version('0.0.1')
  .arguments('<filepath1>')
  .arguments('<filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format');

program.parse(process.argv);
