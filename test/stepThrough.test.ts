import { TestSuite, InputType } from '@jovotech/framework';
import lang from '../src/i18n/en.json';
const testSuite = new TestSuite({ locale: 'en' });

test('clean run', async () => {
  jest.useFakeTimers().setSystemTime(new Date('2022-01-05').getTime());

  let { output: launchOutput } = await testSuite.run({
    type: InputType.Launch,
  });

  expect(launchOutput).toEqual([
    {
      message: lang.translation.StartChoice.greeting.firstTime,
      quickReplies: ['Beginning', 'Today'],
      listen: true,
    },
  ]);

  const { output: BeginOutput } = await testSuite.run({
    intent: 'BeginningIntent',
  });

  expect(BeginOutput[0]).toEqual({
    message: lang.translation.StartChoice.beginning,
    listen: false,
  });

  expect(BeginOutput[3]).toEqual({
    message: 'Today is day 1',
    listen: false,
  });

  expect(testSuite.$user.data!.day).toEqual(2);

  // Try accessing day one again… on day
  const { output: DayOneRepeat } = await testSuite.run({
    type: InputType.Launch,
  });

  expect(DayOneRepeat[0]).toEqual({
    message: lang.translation.Ahead,
    listen: false,
  });

  // There was night, there was morning
  // Go forward a day… day two
  jest.useFakeTimers().setSystemTime(new Date('2022-01-06').getTime());

  expect(testSuite.$user.data!.day).toEqual(2);
  expect(testSuite.$user.data!.lastListenedDay).toEqual(1);

  const { output: DayTwo } = await testSuite.run({
    type: InputType.Launch,
  });

  expect(DayTwo[0]).toEqual({
    message: lang.translation.StartChoice.greeting.returning,
    listen: false,
  });

  expect(DayTwo[1]).toEqual({
    message: 'Today is day 2',
    listen: false,
  });

  expect(testSuite.$user.data!.lastListenedDay).toEqual(2);
  expect(testSuite.$user.data!.day).toEqual(3);

  // There was night, there was morning
  // There was night, there was morning
  // Go forwards a couple of days… but miss the readings 😱
  jest.useFakeTimers().setSystemTime(new Date('2022-01-08').getTime());
  expect(testSuite.$user.data!.lastListenedDay).toEqual(2);
  expect(testSuite.$user.data!.day).toEqual(3);

  // Should get warning that you're behind
  const { output: DayThree } = await testSuite.run({
    type: InputType.Launch,
  });

  expect(DayThree[0]).toEqual({
    message: lang.translation.StartChoice.greeting.returning,
    listen: false,
  });

  // Listen to one
  expect(DayThree[1]).toEqual({
    message:
      "You're currently 1 day behind, come back later today to catch up on your next bible reading…",
    listen: false,
  });

  expect(DayThree[2]).toEqual({
    message: 'Today is day 3',
    listen: false,
  });

  expect(testSuite.$user.data!.lastListenedDay).toEqual(3);
  expect(testSuite.$user.data!.day).toEqual(4);

  // Listen to two
  const { output: DayThreeAgain } = await testSuite.run({
    type: InputType.Launch,
  });

  expect(DayThreeAgain[0]).toEqual({
    message: lang.translation.StartChoice.greeting.returning,
    listen: false,
  });

  expect(DayThreeAgain[1]).toEqual({
    message: 'Today is day 4',
    listen: false,
  });

  // Be all caught up and get blocked again
  const { output: DayThreeAgainAgain } = await testSuite.run({
    type: InputType.Launch,
  });

  expect(DayThreeAgainAgain[0]).toEqual({
    message: lang.translation.Ahead,
    listen: false,
  });
});
