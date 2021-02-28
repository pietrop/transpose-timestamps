// https://stackoverflow.com/questions/18065807/regular-expression-for-removing-whitespaces
function removeWhiteSpaces(text) {
  return text.replace(/\s+/g, ' ').trim();
}

module.exports = removeWhiteSpaces;
