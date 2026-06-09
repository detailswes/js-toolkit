export function partition(arr, predicate) {
  const pass = [];
  const fail = [];
  for (const item of arr) {
    (predicate(item) ? pass : fail).push(item);
  }
  return [pass, fail];
}
