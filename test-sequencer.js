// testSequencer.js
const Sequencer = require('@jest/test-sequencer').default;

// Jest Unity
// Jest integration
// Jest integration repo

class CustomSequencer extends Sequencer {
  sort(tests) {
    // Test structure information
    // https://github.com/facebook/jest/blob/6b8b1404a1d9254e7d5d90a8934087a9c9899dab/packages/jest-runner/src/types.ts#L17-L21
    const copyTests = Array.from(tests);
    const currentPath = __dirname;

    const processLog = process.argv;
    if (processLog.includes('some_path_name')) console.log('teste');


    return this.sortByTestType(tests);
  }

  /**
   *
   * Sorts testes alphabetically
   * @param {string[]} tests
   * @returns {string[]}
   */
  sortByTestType(tests) {
    const unitTests = tests.filter(test => test.path.includes('unit'));
    const integrationTests = tests.filter(test => test.path.includes('integration'));
    const e2eTests = tests.filter(test => test.path.includes('e2e'));

    return [...unitTests, ...integrationTests, ...e2eTests];
  }
}

module.exports = CustomSequencer;
