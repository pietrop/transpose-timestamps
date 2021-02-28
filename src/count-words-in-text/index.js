const splitWordsInText = require('../split-words-in-text');

function countWordsInText(text) {
  return splitWordsInText(text).length;
}

module.exports = countWordsInText;
