/**
 *
 * @param {string} text - string of words
 * @return {array} - array list of words
 */
function splitWordsInText(text) {
  if (!text) {
    return [];
  }
  return text.trim().match(/\S+/g);
}

module.exports = splitWordsInText;
