const matchIt = (md) => function (state) {
  const delimiters = state.delimiters;
  const len = delimiters.length;

  const unpaid = [];
  for (let i = 0; i < len; i++) {
    const item = delimiters[i];
    if (item.marker !== 0x2a /* * */) {
      continue;
    }

    // If this no any previous open emphasis delimiter found, or the previous token is a space or a newline,
    // this must can be a open delimiter.
    let shouldBeOpen = !unpaid.length;
    if (!shouldBeOpen) {
      const prevToken = state.tokens[item.token - 1];
      const lastChar = prevToken.content.slice(-1);
      shouldBeOpen = md.utils.isWhiteSpace(lastChar.charCodeAt(0));
    }

    if (shouldBeOpen) {
      for (let j = 0; j < item.length; j++) {
        const next = j + i;
        if (delimiters[next].marker === item.marker) {
          unpaid.push(next);
          delimiters[next].open = true;
        }
      }
      i += item.length - 1;
      continue;
    }

    const last = unpaid[unpaid.length - 1];
    if (last === undefined) {
      continue;
    }
    // If the previous delimiter has the same marker and is adjacent to this one,
    // merge those into one strong delimiter.
    if (item.close) {
      unpaid.pop();
      continue;
    }

    for (let j = 0; j < item.length; j++) {
      const next = j + i;
      if (delimiters[next].marker === item.marker) {
        delimiters[next].close = true;
        unpaid.pop();
      }
    }
    i += item.length - 1;
  }
}

module.exports = function matchPairs(md) {
  md.inline.ruler2.before("balance_pairs", "match_pairs", matchIt(md));
};
