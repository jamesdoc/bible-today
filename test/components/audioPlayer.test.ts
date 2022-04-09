import { TestSuite, InputType } from '@jovotech/framework';
const testSuite = new TestSuite({ locale: 'en' });

test('audio pause and resume', async () => {
  jest.useFakeTimers().setSystemTime(new Date('2022-01-05').getTime());

  testSuite.$user.data = {
    day: 2,
    lastListenedDay: 1,
    startDate: '2021-01-01T00:00:00.000Z',
  };

  const { output: outputPause } = await testSuite.run([
    { type: InputType.Launch },
    {
      type: InputType.Intent,
      intent: 'AMAZON.PauseIntent',
    },
  ]);

  expect(outputPause[0]!.platforms!.alexa!.nativeResponse!.response!.directives![0]!.type).toBe(
    'AudioPlayer.Stop',
  );

  const { output: outputResume } = await testSuite.run([
    {
      type: InputType.Intent,
      intent: 'AMAZON.ResumeIntent',
    },
  ]);

  expect(outputResume[0]!.platforms!.alexa!.nativeResponse!.response!.directives![0]!.type).toBe(
    'AudioPlayer.Play',
  );
});
