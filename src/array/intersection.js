export function intersection(a, b) {
  const setB = new Set(b);
  return a.filter(x => setB.has(x));
}

export function difference(a, b) {
  const setB = new Set(b);
  return a.filter(x => !setB.has(x));
}
