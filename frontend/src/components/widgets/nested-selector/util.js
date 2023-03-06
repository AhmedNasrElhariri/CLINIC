import * as R from 'ramda';

function* getPaths(o, p = []) {
  console.log('yy')
  yield p;
  if (Object(o) === o)
    for (let k of Object.keys(o)) yield* getPaths(o[k], [...p, k]);
}

export const findPath = (predicate, o) => {
  for (const p of getPaths(o)) if (predicate(R.path(p, o))) return p;
};

export const getValue = (id, data) => {
  let path = findPath(val => val && val.id === id, data);
  const paths = path.map((val, index, arr) => arr.slice(0, index + 1));
  return R.pipe(R.paths(paths), R.reject(Array.isArray))(data);
};
