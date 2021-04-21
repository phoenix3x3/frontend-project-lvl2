import _ from 'lodash';
import formatStylish from './formatStylish.js';
import formatPlain from './formatPlain.js';
import formatJson from './formatJson.js';

const formaters = {
  stylish: formatStylish,
  plain: formatPlain,
  json: formatJson,
};

export default (diff, format) => {
  if (_.has(formaters, format)) {
    return formaters[format](diff);
  }
  throw new Error(`${format} format not available`);
};
