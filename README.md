# Temp Mail Detector

[![CI](https://github.com/IkechukwuAKalu/temp-mail-detector/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/IkechukwuAKalu/temp-mail-detector/actions/workflows/ci.yml) [![npm version](https://badge.fury.io/js/temp-mail-detector.svg)](https://badge.fury.io/js/temp-mail-detector) [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight Node.js module to detect disposable and temporary email addresses to help prevent bot registrations and spam.

## Installation

```bash
npm install temp-mail-detector
```

## Example Usage

### CommonJS (JavaScript)

```js
const { isTempMail } = require("temp-mail-detector");

(async () => {
  const isTemp = await isTempMail("lixawelat@imaild.com");
  console.log(isTemp); // true or false
})();
```

### ES Modules / TypeScript

```ts
import { isTempMail } from "temp-mail-detector";

async function checkEmail(email: string) {
  const isTemp = await isTempMail(email);
  if (isTemp) {
    console.log("Disposable email detected!");
  }
}
```

## Development

To build and test the project locally:

- **Clone repository:**
  ```bash
  git clone https://github.com/IkechukwuAKalu/temp-mail-detector.git
  cd temp-mail-detector
  ```
- **Install dependencies:**
  ```bash
  npm install
  ```
- **Build project:**
  ```bash
  npm run build
  ```
- **Run tests:**
  ```bash
  npm test
  ```
- **Generate test coverage:**
  ```bash
  npm run coverage
  ```

## License

MIT © [Ikechukwu Kalu](https://github.com/IkechukwuAKalu)
