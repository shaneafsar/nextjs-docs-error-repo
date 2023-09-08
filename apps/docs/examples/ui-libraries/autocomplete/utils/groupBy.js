export function groupBy(collection, iteratee, getLimit) {
  return collection.reduce((acc, item) => {
    const key = iteratee(item);

    if (!acc.hasOwnProperty(key)) {
      // eslint-disable-next-line no-param-reassign
      acc[key] = [];
    }

    const limit = getLimit && getLimit(item);

    if (typeof limit !== "number" || acc[key].length < limit) {
      acc[key].push(item);
    }

    return acc;
  }, {});
}
