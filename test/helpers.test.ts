import { TestSuite } from '@jovotech/framework';
import * as utils from '../src/helpers/utils';

test('Day Incrementor should add one to the day', () => {
  expect(utils.dayIncrementor(1)).toBe(2);
  expect(utils.dayIncrementor(4)).toBe(5);
  expect(utils.dayIncrementor(20)).toBe(21);
  expect(utils.dayIncrementor(150)).toBe(151);
});

test('Day Incrementor should handle negative ints', () => {
  expect(utils.dayIncrementor(-34)).toBe(1);
});

test('Day Incrementor should reset at 365', () => {
  expect(utils.dayIncrementor(365)).toBe(1);
  expect(utils.dayIncrementor(366)).toBe(1);
});

test('DoY should return the day number', () => {
  expect(utils.dayOfYear(new Date('2022-01-01'))).toBe(1);
  expect(utils.dayOfYear(new Date('2022-12-31'))).toBe(365);

  // Leap year
  expect(utils.dayOfYear(new Date('2020-12-31'))).toBe(366);
});
