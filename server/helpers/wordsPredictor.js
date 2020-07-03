const englishWords = require('an-array-of-english-words');
const Dictionary = require('./dictionary');

// A key map represiting old phones keys available letters
const keyMap = {
  1: [],
  2: ['a', 'b', 'c'],
  3: ['d', 'e', 'f'],
  4: ['g', 'h', 'i'],
  5: ['j', 'k', 'l'],
  6: ['m', 'n', 'o'],
  7: ['p', 'q', 'r', 's'],
  8: ['t', 'u', 'v'],
  9: ['w', 'x', 'y', 'z'],
};

const dictionary = new Dictionary();

// Build dictionary with all english words
while (englishWords.length > 1) {
  dictionary.insert(englishWords.pop());
}

/**
 * Query the dictionary and returns all possible words or real words
 * @param  {String} numbers String of numbers
 * @param  {Boolean} onlyRealWords Include only real words from the dictionary
 * @return {Object} Object contains real words or all possible words
 */
const getWords = (numbers, onlyRealWords) => {
  const combinations = numbers.split('').map((key) => keyMap[key]);

  let realWords = [];
  let allWords = generateAllPossibleCombinations(combinations);

  allWords.map((word) => {
    realWords.push(...dictionary.autoComplete(word));
  });

  return onlyRealWords ? { words: realWords } : { words: allWords };
};

/**
 * Generate all possbile combinations from a set of keys recursively
 * @param  {Array} keys Array of keys
 * @return {Array} Array of all possible combinations for a given set of keys
 */
const generateAllPossibleCombinations = (keys) => {
  if (keys.length == 0) {
    return [];
  }

  if (keys.length == 1) {
    return keys[0];
  }

  const firstKey = keys[0];
  const secondKey = keys[1];
  let result = [];

  for (let i = 0; i <= firstKey.length - 1; i++) {
    for (let j = 0; j <= secondKey.length - 1; j++) {
      result.push(firstKey[i] + secondKey[j]);
    }
  }

  return generateAllPossibleCombinations([result, ...keys.slice(2)]);
};

module.exports = getWords;
