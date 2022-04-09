import { TestSuite, InputType } from '@jovotech/framework';

const testSuite = new TestSuite({ locale: 'en' });

test('New user should be given a choice', async () => {
  const { output } = await testSuite.run({
    type: InputType.Launch,
  });

  expect(output).toEqual([
    {
      message:
        'Welcome. Would you like to start from the beginning of the reading plan, or pick up midway through with the reading for today?',
      quickReplies: ['Beginning', 'Today'],
      listen: true,
    },
  ]);
});

test('Starting at the beginning gives an introduction', async () => {
  const { output } = await testSuite.run([
    {
      type: InputType.Launch,
    },
    {
      intent: 'BeginningIntent',
    },
  ]);

  expect(output[0]).toEqual({
    message: 'Great, we shall start at the beginning…',
    listen: false,
  });

  expect(output[2]).toEqual({
    message: 'There are 365 days in this plan. Each day is approximately 20 minutes long.',
    listen: false,
  });

  expect(output[3]).toEqual({
    message: 'Today is day 1',
    listen: false,
  });
});

test('Existing user picks up where they left off', async () => {
  testSuite.$user.data = {
    day: 2,
  };

  const { output } = await testSuite.run({
    type: InputType.Launch,
  });

  expect(output[0]).toEqual({
    message: ['Welcome back!', 'Good to see you again'],
    listen: false,
  });

  expect(output[1]).toEqual({
    message: 'Today is day 2',
    listen: false,
  });
});

test('User cannot get ahead of themselves', async () => {
  jest.useFakeTimers().setSystemTime(new Date('2022-01-05').getTime());
  testSuite.$user.data = {
    day: 6,
    lastListenedDay: 5,
    startDate: '2022-01-01T00:00:00.000Z',
  };

  const { output } = await testSuite.run({
    type: InputType.Launch,
  });

  expect(output[0]).toEqual({
    message:
      "You're all caught up, come back tomorrow for the next set of passages in your reading plan.",
    listen: false,
  });
});

test('User is alerted when behind', async () => {
  jest.useFakeTimers().setSystemTime(new Date('2022-01-10').getTime());
  testSuite.$user.data = {
    day: 2,
    lastListenedDay: 1,
    startDate: '2022-01-05T00:00:00.000Z',
  };

  const { output: fourDays } = await testSuite.run({
    type: InputType.Launch,
  });

  expect(fourDays[1]).toEqual({
    message:
      "You're currently 4 days behind, come back later today to catch up on your next bible reading…",
    listen: false,
  });
});

test('end of the year should reset', async () => {
  jest.useFakeTimers().setSystemTime(new Date('2021-12-31').getTime());
  testSuite.$user.data = {
    day: 365,
    lastListenedDay: 364,
    startDate: '2021-01-01T00:00:00.000Z',
  };

  const { output } = await testSuite.run({
    type: InputType.Launch,
  });

  expect(testSuite.$user.data.day).toEqual(1);
});

test('day one should reset the start date', async () => {
  jest.useFakeTimers().setSystemTime(new Date('2021-12-31').getTime());
  testSuite.$user.data = {
    day: 365,
    lastListenedDay: 364,
    startDate: '2021-01-01T00:00:00.000Z',
  };

  const { output: lastYear } = await testSuite.run({
    type: InputType.Launch,
  });

  expect(testSuite.$user.data.day).toEqual(1);

  jest.useFakeTimers().setSystemTime(new Date('2022-01-01').getTime());

  const { output: thisYear } = await testSuite.run({
    type: InputType.Launch,
  });

  expect(testSuite.$user.data).toEqual({
    day: 2,
    lastListenedDay: 1,
    startDate: new Date('2022-01-01'),
  });
});
