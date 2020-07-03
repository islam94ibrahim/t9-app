/**
 * Dictionary Class representing a Trie data structure
 * https://en.wikipedia.org/wiki/Trie
 */
class Dictionary {
  /**
   * Creates a Trie
   * @return {Object} Trie
   */
  constructor() {
    this.words = 0;
    this.prefixes = 0;
    this.children = [];
  }

  /**
   * Insert a string into the Trie
   * @param  {String} string String to add
   * @param  {Number} position Optional position in Trie
   * @return {}
   */
  insert(string, position = 0) {
    if (string.length === 0) {
      return;
    }

    if (position === string.length) {
      this.words++;
      return;
    }

    this.prefixes++;
    const key = string[position];
    if (this.children[key] === undefined) {
      this.children[key] = new Dictionary();
    }

    const child = this.children[key];
    child.insert(string, position + 1);
  }

  /**
   * Return all words in Trie with a given prefix
   * @param  {String} string Prefix to search for
   * @return {Array} Array of strings that match for prefix
   */
  getAllWords(string = '') {
    /* Array of prefixs we are iterating through */
    let wordStack = [];

    /* if this current leaf child, end */
    if (this === undefined) {
      return [];
    }

    /* Check to see if this child node has words left */
    if (this.words > 0) {
      wordStack.push(string);
    }

    /* Iterate through all children and build up the prefixes to the wordStack */
    for (const key in this.children) {
      if ({}.hasOwnProperty.call(this.children, key)) {
        const child = this.children[key];
        wordStack = wordStack.concat(child.getAllWords(string + key));
      }
    }
    return wordStack;
  }

  /**
   * Returns all possible words recursively
   * @param  {String} string String to search for
   * @param  {Number} position Optional position
   * @param  {Array} result Array holding all possible words
   * @return {Array} Returns an array of all possible words
   */
  autoComplete(string, position = 0, result = []) {
    if (string.length === 0) {
      return {};
    }

    const key = string[position];
    const child = this.children[key];

    if (child === undefined) {
      return [];
    }

    if (position === string.length - 1) {
      return [...result, ...child.getAllWords(string)];
    }

    return child.autoComplete(string, position + 1, result);
  }
}

module.exports = Dictionary;
