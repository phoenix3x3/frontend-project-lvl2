import formatStylish from './formatStylish.js';
import formatPlain from './formatPlain.js';
import formatJson from './formatJson.js';

const formaters = {
  stylish: formatStylish,
  plain: formatPlain,
  json: formatJson,
};

export default (diff, format) => formaters[format](diff);
