function round(number) {
  return Math.round(number * 100) / 100;
}

function computeStartTime({ startTime, wordCount, index, endTime }) {
  return (startTime * (wordCount - index) + endTime * index) / wordCount;
}

function computeEndTime({ startTime, wordCount, index, endTime }) {
  return (startTime * (wordCount - (index + 1)) + endTime * (index + 1)) / wordCount;
}

function computeWordsTimings({ text, startTime, endTime }) {
  const nodeWords = text.trim().split(/\s+/);
  return nodeWords.map((nodeWord, idx) => {
    return {
      start: computeStartTime({ startTime, wordCount: nodeWords.length, index: idx, endTime }), //(startTime * (nodeWords.length - idx) + endTime * idx) / nodeWords.length, // weighted average of paragraph start and end times
      end: computeEndTime({ startTime, wordCount: nodeWords.length, index: idx, endTime }), // (startTime * (nodeWords.length - (idx + 1)) + endTime * (idx + 1)) / nodeWords.length,
      text: nodeWord,
    };
  });
}

module.exports = computeWordsTimings;
