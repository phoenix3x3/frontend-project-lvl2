import commander from 'commander';
import genDiff from './genDiff.js';

const program = () => {
  commander
    .version('0.0.1')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'Output format', 'stylish')
    .arguments('<filepath1> <filepath2>')
    .action((filepath1, filepath2) => {
      const result = genDiff(filepath1, filepath2, commander.opts().format);
      console.log(`\n${result}\n`);
    });

  commander.parse();
};

export default program;
