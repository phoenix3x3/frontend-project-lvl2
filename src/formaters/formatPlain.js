import _ from 'lodash';

const convert = (item) => {
  if (typeof item === 'string') return `'${item}'`;
  if (item instanceof Object) return '[complex value]';
  return item;
};

const buildPath = (dir, base) => [dir, base].filter((i) => i !== '').join('.');

const inter = (diff, path = '') => {
  const func = ({ type, key, removedValue = null, currentValue = null }) => {
    const fullPath = buildPath(path, key);

    const lines = {
      compared: () => inter(currentValue, fullPath),
      equal: () => '',
      removed: () => `Property '${fullPath}' was removed`,
      added: () => `Property '${fullPath}' was added with value: ${convert(currentValue)}`,
      replaced: () =>
        `Property '${fullPath}' was updated. From ${convert(removedValue)} to ${convert(
          currentValue
        )}`,
    };

    return lines[type]();
  };
  const result = _.sortBy(diff, [(o) => o.key]);
  return result
    .map(func)
    .filter((item) => item !== '')
    .join('\n');
};

export default (diff) => inter(diff);
