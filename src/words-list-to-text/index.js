function wordsListToText(words) {
  return words
    .map((word) => {
      // TODO: if the word.text is not defined, figure out what to do about it
      return word.text ? word.text.trim() : word.text;
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
      //   return word.text?.trim();
    })
    .join(' ')
    .trim();
}

module.exports = wordsListToText;
