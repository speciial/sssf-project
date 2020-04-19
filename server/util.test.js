const { addNumbers } = require('./util');

test('Tests the addNumber function', () => {
  const result = addNumbers(2, 2);
  expect(result).toBe(4);
});
