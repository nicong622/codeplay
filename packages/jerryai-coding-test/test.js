const RangeList = require('./index');


describe('RangeList.add', () => {
  const rl = new RangeList();

  describe.each([
    [[1, 5], '[1,5)'],
    [[10, 20], '[1,5) [10,20)'],
    [[20, 20], '[1,5) [10,20)'],
    [[20, 21], '[1,5) [10,21)'],
    [[2, 4], '[1,5) [10,21)'],
    [[3, 8], '[1,8) [10,21)'],
  ])('add(%p)', (range, expected) => {
    test(`returns ${expected}`, () => {
      rl.add(range);

      expect(rl.print()).toBe(expected);
    });
  });
});

describe('RangeList.remove', () => {
  const rl = new RangeList();

  rl.add([1, 8]);
  rl.add([10, 21]);

  describe.each([
    [[10, 10], '[1,8) [10,21)'],
    [[10, 11], '[1,8) [11,21)'],
    [[15, 17], '[1,8) [11,15) [17,21)'],
    [[3, 19], '[1,3) [19,21)'],
  ])('remove(%p)', (range, expected) => {
    test(`returns ${expected}`, () => {
      rl.remove(range);

      expect(rl.print()).toBe(expected);
    });
  });
});

describe('RangeList.add negative', () => {
  const rl = new RangeList();

  rl.add([1, 3]);
  rl.add([19, 21]);

  describe.each([
    [[-5, -1], '[-5,-1) [1,3) [19,21)'],
    [[-2, 1], '[-5,3) [19,21)'],
  ])('add(%p)', (range, expected) => {
    test(`returns ${expected}`, () => {
      rl.add(range);

      expect(rl.print()).toBe(expected);
    });
  });
});

describe('RangeList.remove negative', () => {
  const rl = new RangeList();

  rl.add([-5, 3]);
  rl.add([19, 21]);

  describe.each([
    [[-5, -4], '[-4,3) [19,21)'],
    [[-2, 1], '[-4,-2) [1,3) [19,21)'],
  ])('remove(%p)', (range, expected) => {
    test(`returns ${expected}`, () => {
      rl.remove(range);

      expect(rl.print()).toBe(expected);
    });
  });
});
