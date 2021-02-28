## Transpose timestamps

<!-- _One liner + link to confluence page_
_Screenshot of UI - optional_ -->

A node module to align Speech To Text transcript data with human accurate base transcript. By transposing the words from the accurate text onto the time-codes of the STT data via diffing algo.

Revisiting the concept of [stt-align-node](https://github.com/pietrop/stt-align-node) and trying an alternative solution for [the same alignment problem](https://github.com/pietrop/stt-align-node/blob/master/docs/the-alignement-problem.md)

To be used as part of [slate-transcript-editor](https://github.com/pietrop/slate-transcript-editor) which is a component used as part of [autoEdit3](https://www.autoedit.io/)

## Setup

<!-- _stack - optional_
_How to build and run the code/app_ -->

```
git clone git@github.com:pietrop/transpose-timestamps.git
```

```
cd transpose-timestamps
```

```
npm install
```

## Usage

<details>
<summary>example input - <code>transcript</code></summary>

```js
{
    "words": [
        ...
        {
            "id": 46,
            "start": 29.11,
            "end": 29.41,
            "text": "Call"
        },
        {
            "id": 47,
            "start": 29.41,
            "end": 29.63,
            "text": "me"
        },
        {
            "id": 48,
            "start": 29.63,
            "end": 30.35,
            "text": "Ishmael."
        },
        {
            "id": 49,
            "start": 30.9,
            "end": 31.21,
            "text": "Some"
        },
        {
            "id": 50,
            "start": 31.21,
            "end": 31.57,
            "text": "years"
        },
        {
            "id": 51,
            "start": 31.57,
            "end": 32.13,
            "text": "ago."
        },
        {
            "id": 52,
            "start": 32.29,
            "end": 32.66,
            "text": "Never"
        },
        {
            "id": 53,
            "start": 32.66,
            "end": 33.18,
            "text": "mind."
        },
        {
            "id": 54,
            "start": 33.18,
            "end": 33.46,
            "text": "How"
        },
        {
            "id": 55,
            "start": 33.46,
            "end": 33.91,
            "text": "long"
        },
        ...
  ]
}
```

</details>

<details>
<summary>example input - <code>baseText</code></summary>

```
Call me Ishmael. Some years ago—never mind how long precisely—having ...
```

</details>

```js
import transposeWords from 'transpose-timestamps';
const mobyTranscript = require('../sample/data/moby-dick-chapter-1/words.json');
const mobyText = fs.readFileSync('./sample/data/moby-dick-chapter-1/text.txt').toString();

const alignedWords = transposeWords({ baseText: mobyText, transcript: mobyTranscript });

// Do something with the aligned words
```

<details>
<summary>example output</summary>

```js
{
  "words": [
    {
      "id": 46,
      "start": 29.11,
      "end": 29.41,
      "text": "Call"
    },
    {
      "id": 47,
      "start": 29.41,
      "end": 29.63,
      "text": "me"
    },
    {
      "id": 48,
      "start": 29.63,
      "end": 30.35,
      "text": "Ishmael."
    },
    {
      "id": 49,
      "start": 30.9,
      "end": 31.21,
      "text": "Some"
    },
    {
      "id": 50,
      "start": 31.21,
      "end": 31.57,
      "text": "years"
    },
    {
      "id": 51,
      "start": 31.57,
      "end": 32.13,
      "text": "ago"
    },
    {
      "id": 52,
      "start": 32.29,
      "end": 32.66,
      "text": "never"
    },
    {
      "id": 53,
      "start": 32.66,
      "end": 33.18,
      "text": "mind"
    },
    {
      "id": 54,
      "start": 33.18,
      "end": 33.46,
      "text": "how"
    },
    {
      "id": 55,
      "start": 33.46,
      "end": 33.91,
      "text": "long"
    },
        ...
  ]
}
```

</details>

See [example usage](./src/example-usage.js) for more.

_**Note:** Because of constraints with the alignment process the result will split dashed words `-` into (two) separate words_

## System Architecture

<!-- _High level overview of system architecture_ -->

Uses [word-diff](https://www.npmjs.com/package/word-diff) lib for diffing.

<details>
  <summary>Node version of <a href="https://github.com/bbc/stt-align" target="_blank" rel="noopener noreferrer">stt-align</a> by Chris Baume - R&D.</summary>

<!-- _High level overview of system architecture_ -->

In _pseudo code_ overview of `alignSTT`:

- input, output as described in the example usage.
  - Accurate base text transcription, string.
  - Array of word objects transcription from STT service.

Transpose timestamps / alignment

1. convert stt words to text string
   1. normalize stt words text string
   2. normalize base text string
2. Diffing via [word-diff](https://www.npmjs.com/package/word-diff) lib.And iterate over results of diffing
   1. **Replaced**. Is when number of deleted and inserted is equal. And can transpose the timecodes onto the inserted once.
   2. **Deleted** / `remove` words. Words present in STT but not in base text
   3. **Inserted** / `add` words. Words not recognised by STT but present in base text
   4. **Equal** / `text` words. Words recognized correctly by STT. Only need to transpose timecodes, to retain punctuation, capitalization etc..
3. Compute times for inserted words
   1. compute word timings
      1. Using start and end time of section to calculate weighted average start and time for each word in the section.
   2. Edge case if missing end time for last word.
      1. Calculate/estimate the end time from the start time of section by using `calculateWordDuration` (heuristic function that estimated word duration based on number of carchters) to add up word durations up to last one.

 </details>

## Documentation

There's a [docs](./docs) folder in this repository.

[docs/notes](./docs/notes) contains dev draft notes on various aspects of the project. This would generally be converted either into ADRs or guides when ready.

[docs/adr](./docs/adr) contains [Architecture Decision Record](https://github.com/joelparkerhenderson/architecture_decision_record).

> An architectural decision record (ADR) is a document that captures an important architectural decision made along with its context and consequences.

We are using [this template for ADR](https://gist.github.com/iaincollins/92923cc2c309c2751aea6f1b34b31d95)

## Development env

 <!-- _How to run the development environment_ -->

- npm > `6.1.0`
- [Node 12](https://nodejs.org/docs/latest-v12.x/api/)

Node version is set in node version manager [`.nvmrc`](https://github.com/creationix/nvm#nvmrc)

```
nvm use
```

<!-- _Coding style convention ref optional, eg which linter to use_ -->

<!-- _Linting, github pre-push hook - optional_ -->

See [visually inspect results guide](./docs/guides/visually-inspect-results.md) for a way to very the output.

## Build

<!-- _How to run build_ -->

_NA_

## Tests

<!-- _How to carry out tests_ -->

```
npm test
```

With [jest](https://jestjs.io)

## Deployment

<!-- _How to deploy the code/app into test/staging/production_ -->
