const fs = require('fs');
const computeWordsTimings = require('./index');
const removeDash = require('../remove-dash');
const countWordsInText = require('../count-words-in-text');

const mobyTextFirstParagraph = fs.readFileSync('./sample/data/moby-dick-chapter-1/first-paragraph.txt').toString();

test('computeWordsTimings, expect word count to be the same as base text', () => {
  const startTime = 10;
  const endTime = 30;
  const baseTextNoDashes = removeDash(mobyTextFirstParagraph);
  const computedWordsList = computeWordsTimings({ text: baseTextNoDashes, startTime, endTime });
  const computedWordsListCount = computedWordsList.length;
  const baseTextwordCount = countWordsInText(baseTextNoDashes);

  expect(computedWordsListCount).toBe(baseTextwordCount);
});

test('computeWordsTimings, individual words to be defined', () => {
  const startTime = 10;
  const endTime = 30;
  const computedWordsList = computeWordsTimings({ text: mobyTextFirstParagraph, startTime, endTime });

  computedWordsList.forEach((word) => {
    expect(word).toBeDefined();
  });
});

test('computeWordsTimings, individual words start time to be defined', () => {
  const startTime = 10;
  const endTime = 30;
  const computedWordsList = computeWordsTimings({ text: mobyTextFirstParagraph, startTime, endTime });

  computedWordsList.forEach((word) => {
    expect(word.start).toBeDefined();
  });
});

test('computeWordsTimings, individual words end time to be defined', () => {
  const startTime = 10;
  const endTime = 30;
  const computedWordsList = computeWordsTimings({ text: mobyTextFirstParagraph, startTime, endTime });

  computedWordsList.forEach((word) => {
    expect(word.end).toBeDefined();
  });
});

test('computeWordsTimings, individual words text time to be defined', () => {
  const startTime = 10;
  const endTime = 30;
  const computedWordsList = computeWordsTimings({ text: mobyTextFirstParagraph, startTime, endTime });

  computedWordsList.forEach((word) => {
    expect(word.text).toBeDefined();
  });
});
