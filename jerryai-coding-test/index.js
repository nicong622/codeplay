/*
思路：add 的时候，生成一个全部是 '0' 的字符串 string，长度是 range[1]；或者根据 range[1] 在现有的字符串后补 '0'，使得字符串的长度为 range[1]。
  然后把 string[range[0]] ~ string[range[1]] 中的 '0' 全部转成 '1'。
  即用连续的 1 表示一个 range。
  对于负数 range 的情况，只需要在正数的基础上反转一下字符串即可。
*/

class RangeList {
  constructor() {
    // use a string of '0' or '1' to indicate range list. e.g. [1, 5) => 01111; [3, 5) => 00011
    this.positive = ''; // indicating ranges that only include positive and zero
    this.negative = ''; // indicating ranges that only include negative
  }

  reverseString(string) {
    return [...string].reverse().join('');
  }

  /**
   * from 'start' to 'end'(not included), turns every charater in 'target' into 'bit'
   * @param {number} start
   * @param {number} end
   * @param {'0' | '1'} bit
   */
  toggle(target, start, end, bit) {
    const count = end - start;
    const reg = RegExp(`(\\d{${start}})(\\d{${count}})(\\d*)`, 'g');

    return target.replace(reg, (match, p1, p2, p3) => `${p1}${bit.repeat(count)}${p3}`);
  }

  handleAdd(target, range) {
    if (range[1] > target.length) {
      target = target.padEnd(range[1], '0');
    }

    return this.toggle(target, ...range, '1');
  }

  handleRemove(target, range) {
    return this.toggle(target, ...range, '0');
  }

  handleNegative(handler, range) {
    let temp = this.reverseString(this.negative);
    temp = handler(temp, [0 - range[1], 0 - range[0]]);
    return this.reverseString(temp);
  }

  /**
   * Adds a range to the list
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  add(range) {
    if (range[0] > range[1]) {
      [range[0], range[1]] = [range[1], range[0]];
    }

    if (range[0] >= 0) {
      // range 中全部是正数
      this.positive = this.handleAdd(this.positive, range);
    } else if (range[1] < 0) {
      // all negative
      this.negative = this.handleNegative(this.handleAdd.bind(this), range);
    } else {
      // from negative to positive
      this.negative = this.handleNegative(this.handleAdd.bind(this), [range[0], 0]);
      this.positive = this.handleAdd(this.positive, [0, range[1]]);
    }
  }

  /**
   * Removes a range from the list
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  remove(range) {
    if (range[0] > range[1]) {
      [range[0], range[1]] = [range[1], range[0]];
    }

    if (range[0] >= 0) {
      // range 中全部是正数
      this.positive = this.handleRemove(this.positive, range);
    } else if (range[1] < 0) {
      // all negative
      this.negative = this.handleNegative(this.handleRemove.bind(this), range);
    } else {
      // from negative to positive
      this.negative = this.handleNegative(this.handleRemove.bind(this), [range[0], 0]);
      this.positive = this.handleRemove(this.positive, [0, range[1]]);
    }
  }

  /**
   * turns string of '01's into ranges
   * @param {string} target
   * @param {boolean} isPositive
   * @returns
   */
  findRanges(target, isPositive) {
    // 利用正则找出所有连续的 '1'，以及他们的起止 index
    const regexp = RegExp('(1+)', 'gd');

    let ranges = [];
    let result = regexp.exec(target);

    while (result !== null) {
      const indice = result.indices[0];
      result = regexp.exec(target);

      if (isPositive) {
        ranges.push([indice[0], indice[1]]);
      } else {
        ranges.unshift([0 - indice[1], 0 - indice[0]]);
      }
    }

    return ranges;
  }

  /**
   * format
   * @param {Array<[number, number]>} ranges
   * @returns string
   */
  formatPrint(ranges) {
    return ranges.reduce((prev, curr) => [...prev, `[${curr})`], []).join(' ');
  }

  /**
   * Prints out the list of ranges in the range list
   */
  print() {
    // 分别找出正数和负数的 ranges
    const nRanges = this.findRanges(this.reverseString(this.negative));
    const pRanges = this.findRanges(this.positive, true);

    // 如果负数的最后一个 range 与 正数第一个 range 存在连续性，则合并成一个 range
    if (nRanges.length && pRanges.length) {
      if (nRanges.slice(-1)[0][1] === pRanges[0][0]) {
        const start = nRanges.pop()[0];
        pRanges[0][0] = start;
      }
    }

    const ranges = this.formatPrint([...nRanges, ...pRanges]);
    console.log(ranges);
    return ranges;
  }
}

module.exports = RangeList;

const rl = new RangeList();

rl.add([1, 5]);
rl.print();

rl.add([20, 10]);
rl.print();

rl.add([20, 20]);
rl.print();

rl.remove([10, 10]);
rl.print();

rl.remove([10, 11]);
rl.print();

rl.add([-5, 0]);
rl.print();

rl.add([-9, -5]);
rl.print();

rl.add([6, 15]);
rl.print();

rl.remove([-3, -9]);
rl.print();

rl.remove([-1, 3]);
rl.print();
