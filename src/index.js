const transposeWords = require('./transpose-words');
const computeWordsTimings = require('./compute-word-timings');
const transposeWordsTimings = require('./transpose-words-timings');
const calculateEndTimeFromStartTime = require('./calculate-end-time-from-start-time');
const splitWordsInText = require('./split-words-in-text');
const countWordsInText = require('./count-words-in-text');
const normaliseText = require('./normalize-text');
const removeDash = require('./remove-dash');
const sliceList = require('./slice-list');
const calculateWordDuration = require('./calculate-word-duration');

module.exports = transposeWords;
module.exports.computeWordsTimings = computeWordsTimings;
module.exports.transposeWordsTimings = transposeWordsTimings;
module.exports.calculateEndTimeFromStartTime = calculateEndTimeFromStartTime;
module.exports.splitWordsInText = splitWordsInText;
module.exports.countWordsInText = countWordsInText;
module.exports.normaliseText = normaliseText;
module.exports.removeDash = removeDash;
module.exports.sliceList = sliceList;
module.exports.calculateWordDuration = calculateWordDuration;
