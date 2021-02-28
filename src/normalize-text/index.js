const removeNewLines = require('../remove-new-lines');
const removeDash = require('../remove-dash');
const removeWhiteSpaces = require('../remove-white-spaces');
const removePunctuation = require('../remove-punctuation');

function normaliseText(text) {
  //  Remove new line char \n
  const textWithoutLines = removeNewLines(text);
  // Remove dashes
  const textWithoutDashes = removeDash(textWithoutLines);

  // remove punctuation
  const textWithoutPunctuation = removePunctuation(textWithoutDashes);
  // Remove unecessary white spaces
  const textWithoutLinesAndWhiteSpacesAndPunctuation = removeWhiteSpaces(textWithoutPunctuation);
  return textWithoutLinesAndWhiteSpacesAndPunctuation.toLowerCase();
}

module.exports = normaliseText;
