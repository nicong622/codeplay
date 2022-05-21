class RangeList {
  constructor() {
    // a string of '0/1' representing a range. e.g. [1, 5) => 01111; [3, 5) => 00011
    this.rangeString = '';
  }

  /**
   * from 'start' to 'end'(not included), turns every charater in this.rangeString into 'bit'
   * @param {number} start
   * @param {number} end
   * @param {'0' | '1'} bit
   */
  toggle(start, end, bit) {
    const count = end - start;
    const reg = RegExp(`(\\d{${start}})(\\d{${count}})(\\d*)`, 'g');

    this.rangeString = this.rangeString.replace(
      reg,
      (match, p1, p2, p3) => `${p1}${bit.repeat(count)}${p3}`
    );
  }

  /**
   * Adds a range to the list
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  add(range) {
    const count = range[1] - this.rangeString.length;
    if (count > 0) {
      this.rangeString += '0'.repeat(count);
    }

    this.toggle(...range, '1');
  }

  /**
   * Removes a range from the list
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  remove(range) {
    this.toggle(...range, '0');
  }

  /**
   * Prints out the list of ranges in the range list
   */
  print() {
    // use a regexp to find all groups of '1' and their index in this.rangeString
    const regexp = RegExp('(1+)', 'gd');
    const rangeString = this.rangeString;

    let ranges = [];
    let result = regexp.exec(rangeString);

    while (result !== null) {
      const indice = result.indices[0];
      ranges.push(`[${indice[0]}, ${indice[1]})`);
      result = regexp.exec(rangeString);
    }

    return ranges.join(' ');
  }
}

module.exports = RangeList;

const rl = new RangeList();

rl.add([1, 5]);
rl.print();

// rl.add([10, 20]);
// rl.print();

// rl.add([20, 20]);
// rl.print();

// rl.add([20, 21]);
// rl.print();

// rl.add([2, 4]);
// rl.print();

// rl.add([3, 8]);
// rl.print();

// rl.remove([10, 10]);
// rl.print();

// rl.remove([10, 11]);
// rl.print();

// rl.remove([15, 17]);
// rl.print();

// rl.remove([3, 19]);
// rl.print();
