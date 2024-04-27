module.exports = {
  testEnvironment: "node",
  moduleFileExtensions: ["js", "json", "mjs"],
  modulePaths: ["<rootDir>"],
  moduleDirectories: ["node_modules"],
  modulePathIgnorePatterns: ["<rootDir>/node_modules/"],
  testMatch: ["<rootDir>/tests/**/*.test.js"],
  testTimeout: 5000,
};
