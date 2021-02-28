const splitWordsInText = require('./index');

test('countWordsInText -  zero', () => {
  const oneWordString = '';
  const textWordCount = splitWordsInText(oneWordString);
  const expectedTextwordCount = [];
  expect(textWordCount).toEqual(expectedTextwordCount);
});

test('splitWordsInText - one', () => {
  const oneWordString = 'hello';
  const textWordCount = splitWordsInText(oneWordString);
  const expected = ['hello'];
  expect(textWordCount).toEqual(expected);
});

test('splitWordsInText - two', () => {
  const oneWordString = 'hello world';
  const textWordCount = splitWordsInText(oneWordString);
  const expected = ['hello', 'world'];
  expect(textWordCount).toEqual(expected);
});

test('splitWordsInText - two, with side spaces', () => {
  const oneWordString = ' hello world ';
  const textWordCount = splitWordsInText(oneWordString);
  const expected = ['hello', 'world'];
  expect(textWordCount).toEqual(expected);
});
