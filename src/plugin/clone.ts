const clone = (val) => {
  const type = typeof val;
  if (val === null) {
    return null;
  } else if (type === 'undefined' || type === 'number' || type === 'string' || type === 'boolean') {
    return val;
  } else if (type === 'object') {
    if (val instanceof Array) {
      return val.map((x) => clone(x));
    } else if (val instanceof Uint8Array) {
      return new Uint8Array(val);
    } else {
      const o = {};
      for (const key in val) {
        if (o) {
          o[key] = clone(val[key]);
        }
      }
      return o;
    }
  }
  throw new Error('unknown');
};

export default clone;
