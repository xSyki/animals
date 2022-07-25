/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  "transform": {
      "^.+\\.js$": "babel-jest",
      ".+\\.(css|styl|less|sass|scss)$": "jest-css-modules-transform",
      ".+\\.(css|scss|png|jpg|svg)$": "jest-transform-stub"
    },
    moduleNameMapper: {
      '^uuid$': require.resolve('uuid')
  }
}