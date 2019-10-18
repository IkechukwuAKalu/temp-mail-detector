module.exports = {
  automock: false,
  bail: 10,
  clearMocks: true,
  coverageDirectory: "coverage",
  testEnvironment: "node",
  transform: {
    ".(ts|tsx)": "ts-jest"
  },
  testRegex: "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx|js)$",
  moduleFileExtensions: ["ts", "tsx", "js"]
};
