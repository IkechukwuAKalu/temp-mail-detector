# Temp Mail Detector
[![Build Status](https://travis-ci.org/IkechukwuAKalu/temp-mail-detector.svg?branch=master)](https://travis-ci.org/IkechukwuAKalu/temp-mail-detector)
[![npm version](https://badge.fury.io/js/temp-mail-detector.svg)](https://badge.fury.io/js/temp-mail-detector)

This is a Node.js module to detect temporary email addresses. It helps developers prevent bots from creating multiple user accounts utilzing those addresses.

This software is still being developed and updates will be published on this document. In the meantime, ideas and suggestions for improvements and fixes are welcome.

## Installation
To install this package, run `npm install --save temp-mail-detector` or `npm i -S temp-mail-detector`

## Example Usage
The code below shows how to use this package to detect temporary email addresses
```js
const detector = require("temp-mail-detector");

(async function() {
  const email = "lixawelat@imaild.com";
  const result = await detector.isTempMail(email);
  console.log(result); // returns true or false
})();
```

## Run from Source
To run this project, you need the following software installed; `git`, `node` and `npm`. NPM usually comes bundled together in the Node.Js installer. After you have installed them, follow the steps below to run this project.

- Clone the project `git clone https://github.com/IkechukwuAKalu/temp-mail-detector.git`
- Navigate to the project root directory in your terminal
- Install dependencies `npm i`
- Build the project `npm run build`
- Run the project `npm start`

**NOTE:** The command, `npm run build`, enables Typescript watch on `.ts` files. To run the project, you have to open a new terminal session still at the project root directory.

## Run Tests
Tests have been included in this project to ensure everything works as expected.
- To run tests for this project, `npm test` or `npm run test-watch` to watch files for modifications
- To generate a test coverage report, `npm run coverage`

====