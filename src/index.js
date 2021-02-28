// const diff = require('fast-diff');
const wordDiff = require('word-diff');
const computeWordsTimings = require('./compute-word-timings');
const calculateEndTimeFromStartTime = require('./calculate-end-time-from-start-time');
const splitWordsInText = require('./split-words-in-text');
const countWordsInText = require('./count-words-in-text');
const normaliseText = require('./normalize-text');
const removeDash = require('./remove-dash');
const sliceList = require('./slice-list');
const transposeWordsTimings = require('./transpose-words-timings');
const wordsListToText = require('./words-list-to-text');

function computeSectionsOfInsertedWords(result) {
  const computedWords = result.map((section, index) => {
    if (typeof section === 'string') {
      // if it's not first paragraph
      let startTime = 0;
      if (index !== 0) {
        const previousParagraph = result[index - 1];
        startTime = previousParagraph[0].start;
      }
      // if it's not last paragraph
      let endTime;
      if (result.length - 1 !== index) {
        const nextParagraph = result[index + 1];
        endTime = nextParagraph[nextParagraph.length - 1].end;
      } else {
        endTime = calculateEndTimeFromStartTime({ text: section, startTime });
      }
      const list = splitWordsInText(section);
      // is there a way to do this without a nested array?
      const computedWordsList = list.map((wordText) => {
        return computeWordsTimings({ text: wordText, startTime, endTime });
      });
      return computedWordsList;
    } else {
      return section;
    }
  });
  return computedWords.flat(2);
}

function transposeWords({ baseText, transcript }) {
  const baseTextList = splitWordsInText(removeDash(baseText));
  let wordIndexCounter = 0;
  let textIndexCounter = 0;

  const { words } = transcript;
  const wordsListAsText = wordsListToText(words);
  const wordsListAsTextNormalized = normaliseText(wordsListAsText);
  const textNormalized = normaliseText(baseText);

  const diffResult = wordDiff.diffString(wordsListAsTextNormalized, textNormalized);

  const result = diffResult
    .map(({ text, remove, add }) => {
      // DELETE - increase counter of word position
      if (remove) {
        wordIndexCounter += countWordsInText(remove);
      }
      // INSERT
      if (add) {
        // Compute timings
        textIndexCounter += countWordsInText(add);
        return add.trim();
      }
      // EQUAL
      if (text) {
        const startWordIndex = wordIndexCounter;
        const startTextIndex = textIndexCounter;
        const endWordIndex = wordIndexCounter + countWordsInText(text);
        const endTextIndex = textIndexCounter + countWordsInText(text);
        const tmpWordsList = sliceList({ start: startWordIndex, end: endWordIndex, list: words });
        // need to slice original text
        const tmpTextList = sliceList({ start: startTextIndex, end: endTextIndex, list: baseTextList });
        const tmpText = tmpTextList.join(' ').trim();
        wordIndexCounter += countWordsInText(text);
        textIndexCounter += countWordsInText(text);
        // Transpose words
        const transposedTimesWordsList = transposeWordsTimings({ wordsList: tmpWordsList, textList: tmpTextList });
        return transposedTimesWordsList;
      }
    })
    .filter((result) => {
      return result ? result : false;
    });

  const resultWithComputedInsertedWordsSection = computeSectionsOfInsertedWords(result);

  return { words: resultWithComputedInsertedWordsSection };
}

module.exports = transposeWords;
