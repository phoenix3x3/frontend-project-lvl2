import _ from 'lodash';

const tab = '  ';
const tabStep = 2;

const convert = (item, gap) => {
  if (!(item instanceof Object)) return item;
  const func = ([key, value]) => `{\n${gap}${tab.repeat(3)}${key}: ${value}\n${gap}${tab}}`;
  return Object.entries(item).flatMap(([key, value]) => func([key, value]));
};
const inter = (diff, tabCount) => {
  const func = ({ type, key, removedValue = null, currentValue = null }) => {
    const gap = tab.repeat(tabCount);

    const lines = {
      compared: () =>
        `${gap}${tab}${key}: {\n${inter(currentValue, tabCount + tabStep)}\n${gap}${tab}}`,
      equal: () => `${gap}${tab}${key}: ${convert(currentValue, gap)}`,
      removed: () => {
        if (currentValue instanceof Object) {
          return `${gap}- ${key}: {\n${inter(currentValue, tabCount + tabStep)}\n${gap}${tab}}`;
        }
        return `${gap}- ${key}: ${convert(removedValue, gap)}`;
      },
      added: () => {
        if (currentValue instanceof Object) {
          return `${gap}+ ${key}: {\n${inter(currentValue, tabCount + tabStep)}\n${gap}${tab}}`;
        }
        return `${gap}+ ${key}: ${convert(currentValue, gap)}`;
      },
      replaced: () => [lines.removed(), lines.added()],
    };

    if (!lines[type]) {
      throw new Error(`incorrect type`);
    }

    return lines[type]();
  };

  const sortedObj = _.sortBy(diff, [(o) => o.key]);
  const result = sortedObj.flatMap(func).join('\n');
  return result;
};

export default (diff) => `{\n${inter(diff, 1)}\n}`;
