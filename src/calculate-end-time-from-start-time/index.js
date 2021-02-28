const calculateWordDuration = require('./calculate-word-duration');
const splitWordsInText = require('../split-words-in-text');

function calculateEndTimeFromStartTime({ text, startTime }) {
  const list = splitWordsInText(text);
  const endTime = list.reduce((total, currentValue, currentIndex, arr) => {
    return total + calculateWordDuration(currentValue);
  }, startTime);
  return endTime;
}

module.exports = calculateEndTimeFromStartTime;
