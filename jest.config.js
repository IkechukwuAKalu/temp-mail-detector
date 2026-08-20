module.exports = {
  automock: false,
  bail: 10,
  clearMocks: true,
  coverageDirectory: "coverage",
  testEnvironment: "node",
  transform: {
    ".(ts|tsx)": "ts-jest"
  },
  testMatch: ["**/__tests__/**/*.spec.ts"],
  moduleFileExtensions: ["ts", "tsx", "js"]
};

