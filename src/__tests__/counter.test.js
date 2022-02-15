import itemsCounter from '../counter.js';

test('Test that counter displays movie list length', () => {
  expect(itemsCounter([])).toBe(0);
  expect(itemsCounter([1])).toBe(1);
  expect(itemsCounter([1, 2, 3])).toBe(3);
  expect(itemsCounter([1, 2, 3, 4])).toBe(4);
});
