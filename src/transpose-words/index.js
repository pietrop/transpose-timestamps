// const diff = require('fast-diff');
const wordDiff = require('word-diff');
const computeWordsTimings = require('../compute-word-timings');
const calculateEndTimeFromStartTime = require('../calculate-end-time-from-start-time');
const splitWordsInText = require('../split-words-in-text');
const countWordsInText = require('../count-words-in-text');
const normaliseText = require('../normalize-text');
const removeDash = require('../remove-dash');
const sliceList = require('../slice-list');
const transposeWordsTimings = require('../transpose-words-timings');
const wordsListToText = require('../words-list-to-text');

function computeSectionsOfInsertedWords(result) {
  const computedWords = result.map((section, index) => {
    if (typeof section === 'string') {
      // console.log('section', section);
      let startTime = 0;
      // if it's not the first paragraph
      if (index !== 0) {
        const previousSection = result[index - 1];
        // Get the last word of the previouse section if it's more then one in the list
        // TODO: is there a situaiton where the previous section might be empty? - don't think so.
        const previousSectionLastword = previousSection.length > 1 ? previousSection[previousSection.length - 1] : previousSection;
        startTime = previousSectionLastword.end;
      }
      // console.log('startTime', startTime);
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
  console.log('diffResult', diffResult);
  const result = diffResult
    .map(({ text, remove, add }) => {
      // REPLACED WORDS
      // Optimizaiton if delete and remove have same word count
      // transpose the timecodes from the once `add`/inserted results
      if (add && remove && countWordsInText(remove) === countWordsInText(add)) {
        //   // Transpose
        const startWordIndex = wordIndexCounter;
        const startTextIndex = textIndexCounter;
        const endWordIndex = wordIndexCounter + countWordsInText(add);
        const endTextIndex = textIndexCounter + countWordsInText(add);
        const tmpTextList = sliceList({ start: startTextIndex, end: endTextIndex, list: baseTextList });
        const tmpWordsList = sliceList({ start: startWordIndex, end: endWordIndex, list: words });
        const transposedTimesWordsList = transposeWordsTimings({ wordsList: tmpWordsList, textList: tmpTextList });
        // console.log('transposedTimesWordsList', transposedTimesWordsList);
        // increase counters
        wordIndexCounter += countWordsInText(remove);
        textIndexCounter += countWordsInText(add);
        return transposedTimesWordsList;
      }
      // DELETED WORDS
      // increase counter of word position
      // Words present in STT but not in base text
      if (remove) {
        wordIndexCounter += countWordsInText(remove);
      }
      // INSERTED WORDS
      // Words not recognised by STT but present in base text
      if (add) {
        // Compute timings
        textIndexCounter += countWordsInText(add);
        return add.trim();
      }
      // EQUAL WORDS/TEXT
      // Words recognized correctly by STT
      if (text) {
        const startWordIndex = wordIndexCounter;
        const startTextIndex = textIndexCounter;
        const endWordIndex = wordIndexCounter + countWordsInText(text);
        const endTextIndex = textIndexCounter + countWordsInText(text);
        const tmpWordsList = sliceList({ start: startWordIndex, end: endWordIndex, list: words });
        // need to slice original text
        const tmpTextList = sliceList({ start: startTextIndex, end: endTextIndex, list: baseTextList });
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
