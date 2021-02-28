const fs = require('fs');
const transposeWords = require('./index');
const mobyTranscriptFirstParagraph = require('../sample/data/moby-dick-chapter-1/first-paragraph.json');
const mobyTextFirstParagraph = fs.readFileSync('./sample/data/moby-dick-chapter-1/first-paragraph.txt').toString();

const res = transposeWords({ baseText: mobyTextFirstParagraph, transcript: mobyTranscriptFirstParagraph });
// console.log(res);
fs.writeFileSync('./sample/output/output-first-paragraph.json', JSON.stringify(res, null, 2));

const mobyTranscript = require('../sample/data/moby-dick-chapter-1/words.json');
const mobyText = fs.readFileSync('./sample/data/moby-dick-chapter-1/text.txt').toString();

const res2 = transposeWords({ baseText: mobyText, transcript: mobyTranscript });
console.log(res2);
fs.writeFileSync('./sample/output/output.json', JSON.stringify(res2, null, 2));

// const fs = require('fs');
// const moby = require('../sample-data/moby-dick-chapter-1/words.json');
// const res = moby.retval.words.map(({ start, end, punct, index }) => {
//   return {
//     id: index,
//     start,
//     end,
//     text: punct,
//   };
// });
// console.log(res);
// fs.writeFileSync('./sample-data/moby-dick-chapter-1/words2.json', JSON.stringify({ words: res }, null, 2));
