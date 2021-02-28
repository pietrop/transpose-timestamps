// https://remarkablemark.org/blog/2019/09/28/javascript-remove-punctuation/
const PUNCTUAITON = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
var PUNCTUAITON_REGEX = new RegExp('[' + PUNCTUAITON + ']', 'g');

function removePunctuation(string) {
  return string.replace(PUNCTUAITON_REGEX, '');
}

module.exports = removePunctuation;
