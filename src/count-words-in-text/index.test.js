const fs = require('fs');
const countWordsInText = require('./index');
const mobyFirstParagraphText = fs.readFileSync('./sample/data/moby-dick-chapter-1/first-paragraph.txt').toString();

test('countWordsInText', () => {
  const textWordCount = countWordsInText(mobyFirstParagraphText);
  const expectedTextwordCount = 198;
  expect(textWordCount).toBe(expectedTextwordCount);
});

test('countWordsInText -  zero', () => {
  const oneWordString = '';
  const textWordCount = countWordsInText(oneWordString);
  const expectedTextwordCount = 0;
  expect(textWordCount).toBe(expectedTextwordCount);
});

test('countWordsInText -  one word', () => {
  const oneWordString = 'hello';
  const textWordCount = countWordsInText(oneWordString);
  const expectedTextwordCount = 1;
  expect(textWordCount).toBe(expectedTextwordCount);
});

test('countWordsInText -  two words', () => {
  const oneWordString = 'hello world';
  const textWordCount = countWordsInText(oneWordString);
  const expectedTextwordCount = 2;
  expect(textWordCount).toBe(expectedTextwordCount);
});
