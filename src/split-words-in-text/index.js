function splitWordsInText(text) {
  return text.trim().match(/\S+/g);
}

module.exports = splitWordsInText;
