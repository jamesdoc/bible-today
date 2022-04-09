import { TestSuite, InputType } from '@jovotech/framework';
import lang from '../../src/i18n/en.json';
const testSuite = new TestSuite({ locale: 'en' });

test('start beginning', async () => {
  jest.useFakeTimers().setSystemTime(new Date('2022-01-05').getTime());

  const { output } = await testSuite.run([
    { type: InputType.Launch },
    {
      type: InputType.Intent,
      intent: 'BeginningIntent',
    },
  ]);

  expect(output[0]).toEqual({
    message: lang.translation.StartChoice.beginning,
    listen: false,
  });

  expect(testSuite.$user.data.lastListenedDay).toEqual(1);
  expect(testSuite.$user.data.day).toEqual(2);
  expect(testSuite.$user.data.startDate).toEqual(new Date('2022-01-05'));
});

test('start today', async () => {
  jest.useFakeTimers().setSystemTime(new Date('2022-01-05').getTime());

  const { output } = await testSuite.run([
    { type: InputType.Launch },
    {
      type: InputType.Intent,
      intent: 'TodayIntent',
    },
  ]);

  expect(output[0]).toEqual({
    message: lang.translation.StartChoice.midway,
    listen: false,
  });

  expect(testSuite.$user.data.lastListenedDay).toEqual(5);
  expect(testSuite.$user.data.day).toEqual(6);
  expect(testSuite.$user.data.startDate).toEqual(new Date('2022-01-01'));
});

test('unhandled response', async () => {
  const { output } = await testSuite.run([
    { type: InputType.Launch },
    {
      type: InputType.Text,
      text: 'I am a fish',
    },
  ]);

  expect(output[0].message).toEqual(lang.translation.StartChoice.greeting.firstTime);
});
