#!/usr/bin/env node
import program from 'commander';
import genDiff from '../src/genDiff.js';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const result = genDiff(filepath1, filepath2, program.opts().format);
    console.log(`\n${result}\n`);
  });

program.parse(process.argv);
