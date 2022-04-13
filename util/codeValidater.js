function pythonValidater(code) {
  if (!code || code.length < 0) return false;

  reg1 = RegExp(/\bimport\W+(?:\w+\W+){0,}(?:os|subprocess|importlib)\b/g);
  words = ["open(", "os"];

  if (code.match(reg1)) {
    return false;
  } else if (
    words.every((el) => code.toLowerCase().includes(el.toLowerCase()))
  ) {
    return false;
  }
  return true;
}

module.exports = pythonValidater;
