const transposeWords = require('./index');
const countWordsInText = require('./count-words-in-text');
const removeDash = require('./remove-dash');
const mobyTranscriptFirstParagraph = require('../sample/data/moby-dick-chapter-1/first-paragraph.json');
const mobyTextFirstParagraph = require('../sample/data/moby-dick-chapter-1/text.js');
test('transposeWords, expect word count to be same as base text', () => {
  const alignedWords = transposeWords({ baseText: mobyTextFirstParagraph, transcript: mobyTranscriptFirstParagraph });
  const baseTextNoDashes = removeDash(mobyTextFirstParagraph);
  const baseTextwordCount = countWordsInText(baseTextNoDashes);
  const alignedWordsCount = alignedWords.words.length;
  expect(alignedWordsCount).toBe(baseTextwordCount);
});

test('computeWordsTimings, individual words to be defined', () => {
  const alignedWords = transposeWords({ baseText: mobyTextFirstParagraph, transcript: mobyTranscriptFirstParagraph });
  alignedWords.words.forEach((word) => {
    expect(word).toBeDefined();
  });
});

test('computeWordsTimings, individual words start time to be defined', () => {
  const alignedWords = transposeWords({ baseText: mobyTextFirstParagraph, transcript: mobyTranscriptFirstParagraph });
  alignedWords.words.forEach((word) => {
    expect(word.start).toBeDefined();
  });
});

test('computeWordsTimings, individual words end time to be defined', () => {
  const alignedWords = transposeWords({ baseText: mobyTextFirstParagraph, transcript: mobyTranscriptFirstParagraph });
  alignedWords.words.forEach((word) => {
    expect(word.end).toBeDefined();
  });
});

test('computeWordsTimings, individual words text time to be defined', () => {
  const alignedWords = transposeWords({ baseText: mobyTextFirstParagraph, transcript: mobyTranscriptFirstParagraph });

  alignedWords.words.forEach((word) => {
    expect(word.text).toBeDefined();
  });
});
