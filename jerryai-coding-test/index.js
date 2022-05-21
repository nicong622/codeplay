class RangeList {
  constructor() {
    this.rangeString = '';
  }

  toggle(from, to, bit) {
    const count = to - from;

    this.rangeString =
      this.rangeString.slice(0, from) + bit.repeat(count) + this.rangeString.slice(to);
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
    const regexp = RegExp('(1+)', 'gd');
    const rangeString = this.rangeString;

    let ranges = [];
    let result = regexp.exec(rangeString);

    while (result !== null) {
      const indice = result.indices[0];
      ranges.push(`[${indice[0]}, ${indice[1]})`);
      result = regexp.exec(rangeString);
    }

    // console.log(ranges);
    return ranges.join(' ');
  }
}

module.exports = RangeList;

const rl = new RangeList();

rl.add([1, 5]);
rl.print();

rl.add([10, 20]);
rl.print();

rl.add([20, 20]);
rl.print();

rl.add([20, 21]);
rl.print();

rl.add([2, 4]);
rl.print();

rl.add([3, 8]);
rl.print();

rl.remove([10, 10]);
rl.print();

rl.remove([10, 11]);
rl.print();

rl.remove([15, 17]);
rl.print();

rl.remove([3, 19]);
rl.print();
