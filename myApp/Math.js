exports.sum = (a, b) => {
  if (typeof a !== "number" || typeof b !== "number") {
    return "Please entry numbers";
  }
  return a + b;
};

exports.square = (x) => {
  if (typeof x != "number") return "Please entry number";
  if (x == Infinity) return Infinity;
  return x * x;
};
