export function objHas(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

export function clearObject(obj) {
  return Object.keys(obj)
    .filter((k) => obj[k] !== undefined && obj[k] !== null)
    .reduce((acc, k) => Object.assign(acc, { [k]: obj[k] }), {});
}
