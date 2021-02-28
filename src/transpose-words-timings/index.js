/**
 *
 * @param {array} param0.wordsList - array of word objects, with `text` attribute from STT
 * (as well as `start` `end` time codes attributes, altho those are not used by this function)
 * @param {array} param0.textList  - list of accurate words from base text human accurate transcript
 * @return {array} list of words with accurate text and timecodes
 */
function transposeWordsTimings({ wordsList, textList }) {
  return wordsList.map((word, index) => {
    const tmpWord = word;
    tmpWord.text = textList[index];
    return tmpWord;
  });
}

module.exports = transposeWordsTimings;
