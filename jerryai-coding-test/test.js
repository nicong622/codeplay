const RangeList = require('./index');

const rl = new RangeList();

describe('RangeList.add', () => {
  describe.each([
    [[1, 5], '[1, 5)'],
    [[10, 20], '[1, 5) [10, 20)'],
    [[20, 20], '[1, 5) [10, 20)'],
    [[20, 21], '[1, 5) [10, 21)'],
    [[2, 4], '[1, 5) [10, 21)'],
    [[3, 8], '[1, 8) [10, 21)'],
  ])('add(%p)', (range, expected) => {
    test(`returns ${expected}`, () => {
      rl.add(range);

      expect(rl.print()).toBe(expected);
    });
  });
});

describe('RangeList.remove', () => {
  describe.each([
    [[10, 10], '[1, 8) [10, 21)'],
    [[10, 11], '[1, 8) [11, 21)'],
    [[15, 17], '[1, 8) [11, 15) [17, 21)'],
    [[3, 19], '[1, 3) [19, 21)'],
  ])('remove(%p)', (range, expected) => {
    test(`returns ${expected}`, () => {
      rl.remove(range);

      expect(rl.print()).toBe(expected);
    });
  });
});
