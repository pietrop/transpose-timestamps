const fs = require('fs');
const countWordsInText = require('./index');
const mobyFirstParagraphText = fs.readFileSync('./sample/data/moby-dick-chapter-1/first-paragraph.txt').toString();

test('countWordsInText', () => {
  const textWordCount = countWordsInText(mobyFirstParagraphText);
  const expectedTextwordCount = 198;
  expect(textWordCount).toBe(expectedTextwordCount);
});
