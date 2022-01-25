function check(str, bracketsConfig) {
  const stack = [];
  const closedBrackets = {};
  bracketsConfig.forEach(([open, closed]) => closedBrackets[closed] = open)
  const openBrackets = Object.values(closedBrackets);

  let brackets = [
    ...Object.keys(closedBrackets),
    ...Object.values(closedBrackets),
  ]
  brackets = new Set(brackets)
  brackets = [...brackets]

  for (let i = 0; i < str.length; i++) {
    const current = str[i];

    const isOpen = openBrackets.includes(current)
    const mapped = closedBrackets[current];

    if (mapped && stack.length > 0) {
      const top = stack.pop()
      if (top !== mapped) {
        if (isOpen) {
          stack.push(top)
          stack.push(current)
          continue;
        }
        return false;
      }
    } else if (brackets.includes(current)) {
      stack.push(current);
    }
  }

  return stack.length === 0;
}

module.exports = check;
