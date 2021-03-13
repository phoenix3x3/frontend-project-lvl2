import yaml from 'js-yaml';

const parser = {
  '.yml': yaml.load,
  '.json': JSON.parse,
};

export default (data, format) => parser[format](data);
