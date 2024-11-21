# guesslang-js

A JavaScript library that uses machine learning to detect source code languages. Powered by [@yoeo](https://github.com/yoeo)'s [guesslang](https://github.com/yoeo/guesslang) model!

Inspired by and modified from [vscode-languagedetection](https://github.com/microsoft/vscode-languagedetection) to add browser support.

This is a fork of https://github.com/hieplpvip/guesslang-js, aimed at:
- esm and web worker support
- fix memory leak issues
- better build process

## Usage

This library is intended to be used only in browser. For Node.JS, please consider using [vscode-languagedetection](https://github.com/microsoft/vscode-languagedetection).

Install via `npm`:
```bash
npm install @ray-d-song/guesslang-js

# or yarn
yarn add @ray-d-song/guesslang-js

# or pnpm
pnpm add @ray-d-song/guesslang-js
```

Now you can use it in your project:

```js
import { GuessLang } from '@ray-d-song/guesslang-js';
```

Declare sample code:

```js
const code = `
struct Rectangle {
  width: u32,
  height: u32,
}

fn main() {
  let rect1 = Rectangle {
    width: 30,
    height: 50,
  };

  println!(
    "The area of the rectangle is {} square pixels.",
    area(&rect1)
  );
}

fn area(rectangle: &Rectangle) -> u32 {
  rectangle.width * rectangle.height
}
`;
```

### With Promise

```js
// You should only create one guesslang instance
const guessLang = new GuessLang();

guessLang.runModel(code).then((result) => {
  console.log(result);
});
```

### With async/await

```js
const guessLang = new GuessLang();

const result = await guessLang.runModel(code);
console.log(result);
```

### With Web Worker

```js
import { GuessLangWorker } from '@ray-d-song/guesslang-js/worker';

const guessLang = new GuessLangWorker();
const result = await guessLang.runModel(code);
console.log(result);
```

You should get an output similar to this:

```json
[
  { "languageId": "rs", "confidence": 0.7457122802734375 },
  { "languageId": "js", "confidence": 0.03622082620859146 },
  { "languageId": "ts", "confidence": 0.02657853439450264 },
  { "languageId": "html", "confidence": 0.018268872052431107 },
  { "languageId": "dart", "confidence": 0.017024816945195198 },
  { "languageId": "css", "confidence": 0.013620768673717976 },
  { "languageId": "go", "confidence": 0.012718110345304012 },
  { "languageId": "c", "confidence": 0.011547493748366833 },
  { "languageId": "lua", "confidence": 0.011429708451032639 },
  { "languageId": "cpp", "confidence": 0.010202286764979362 },
  { "languageId": "swift", "confidence": 0.010128483176231384 },
  { "languageId": "kt", "confidence": 0.008081216365098953 },
  { "languageId": "pm", "confidence": 0.007753847632557154 },
  { "languageId": "groovy", "confidence": 0.007391981780529022 },
  { "languageId": "scala", "confidence": 0.0069132656790316105 },
  { "languageId": "r", "confidence": 0.006373902782797813 },
  { "languageId": "ps1", "confidence": 0.004702022764831781 },
  { "languageId": "mm", "confidence": 0.004345177672803402 },
  { "languageId": "tex", "confidence": 0.004238464403897524 },
  { "languageId": "asm", "confidence": 0.0035753981210291386 },
  { "languageId": "php", "confidence": 0.0029875021427869797 },
  { "languageId": "cs", "confidence": 0.00282992678694427 },
  { "languageId": "erl", "confidence": 0.0026539231184870005 },
  { "languageId": "hs", "confidence": 0.0022999923676252365 },
  { "languageId": "java", "confidence": 0.0021398833487182856 },
  { "languageId": "json", "confidence": 0.0018522157333791256 },
  { "languageId": "jl", "confidence": 0.0016744869062677026 },
  { "languageId": "coffee", "confidence": 0.0014533938374370337 },
  { "languageId": "ml", "confidence": 0.0014339216286316514 },
  { "languageId": "prolog", "confidence": 0.0013837843434885144 },
  { "languageId": "md", "confidence": 0.0011162260780110955 },
  { "languageId": "rb", "confidence": 0.0010244469158351421 },
  { "languageId": "bat", "confidence": 0.0009783837012946606 },
  { "languageId": "ex", "confidence": 0.0009154175058938563 },
  { "languageId": "pas", "confidence": 0.0009110081009566784 },
  { "languageId": "xml", "confidence": 0.0008580578141845763 },
  { "languageId": "sh", "confidence": 0.0008576430263929069 },
  { "languageId": "py", "confidence": 0.0006855467217974365 },
  { "languageId": "csv", "confidence": 0.0006681767990812659 },
  { "languageId": "yaml", "confidence": 0.0006367963505908847 },
  { "languageId": "sql", "confidence": 0.0006355350487865508 },
  { "languageId": "vba", "confidence": 0.0005863389233127236 },
  { "languageId": "dm", "confidence": 0.0004887901013717055 },
  { "languageId": "matlab", "confidence": 0.0003887197526637465 },
  { "languageId": "v", "confidence": 0.000384387094527483 },
  { "languageId": "clj", "confidence": 0.0003443971218075603 },
  { "languageId": "f90", "confidence": 0.0002740618074312806 },
  { "languageId": "cmake", "confidence": 0.000268166622845456 },
  { "languageId": "ini", "confidence": 0.00018944506882689893 },
  { "languageId": "makefile", "confidence": 0.0001014301014947705 },
  { "languageId": "lisp", "confidence": 0.00006610684067709371 },
  { "languageId": "cbl", "confidence": 0.00004037651524413377 },
  { "languageId": "dockerfile", "confidence": 0.00002403824146313127 },
  { "languageId": "toml", "confidence": 0.000019977496776846237 }
]
```

### Advanced Options

You can pass an optional object to `GuessLang` containing the following options:

- `minContentSize?: number` - The minimum number of characters in a file to be considered for language detection. Defaults to `20`.
- `maxContentSize?: number` - The maximum number of characters _that will be used_ in a file to be considered for language detection. Defaults to `100000`.

For example:

```js
const guessLang = new GuessLang({
  minContentSize: 0,
  maxContentSize: 1000,
});
```

## Differences from vscode-languagedetection

The only notable difference is that this library includes the guesslang model as Base64 encoded string, allowing everything to be loaded from one single file. Meanwhile, `vscode-languagedetection` loads the model from files using `fs`.

## Credits

- [guesslang](https://github.com/yoeo/guesslang)
- [vscode-languagedetection](https://github.com/microsoft/vscode-languagedetection)
- [base64-arraybuffer](https://github.com/niklasvh/base64-arraybuffer)
- [base64-inline-loader](https://github.com/monolithed/base64-inline-loader)
