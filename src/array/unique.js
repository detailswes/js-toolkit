export function unique(arr) {
  return [...new Set(arr)];
}

export function uniqueBy(arr, key) {
  const seen = new Set();
  return arr.filter(item => {
    const val = typeof key === 'function' ? key(item) : item[key];
    if (seen.has(val)) return false;
    seen.add(val);
    return true;
  });
}
