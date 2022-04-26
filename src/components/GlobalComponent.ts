import { Component, BaseComponent, Global, Intents, Handle } from '@jovotech/framework';
import { StartChoiceComponent } from './StartChoiceComponent';
import { FindAudioComponent } from './FindAudioComponent';
import dayjs from 'dayjs';

/*
|--------------------------------------------------------------------------
| Global Component
|--------------------------------------------------------------------------
|
| The global component handlers can be reached from anywhere in the app
| Learn more here: www.jovo.tech/docs/components#global-components
|
*/
@Global()
@Component()
export class GlobalComponent extends BaseComponent {
  LAUNCH() {
    const { lastListenedDay, day, startDate } = this.$user.data;

    // Check if we are ahead of ourselves…
    if (lastListenedDay && startDate) {
      const today = dayjs();
      const dayCheck = dayjs(startDate).add(lastListenedDay, 'days');

      if (dayCheck.isAfter(today)) {
        return this.$redirect('AheadComponent');
      }

      this.$session.data.behind = dayCheck.diff(today, 'day');
    }

    // If we've got a valid day, play today's audio…
    if (day) {
      this.$send({
        message: this.$t<string[]>('StartChoice.greeting.returning'),
        listen: false,
      });

      if (this.$session.data.behind < 0) {
        const count = this.$session.data.behind * -1;

        this.$send({
          message: this.$t('Launch.behind', { count }),
          listen: false,
        });
      }

      return this.$redirect(FindAudioComponent);
    }

    // Set up the Bible reading plan…
    return this.$redirect(StartChoiceComponent);
  }

  @Handle({
    intents: [{ name: 'StartOverIntent', global: true }],
    prioritizedOverUnhandled: true,
  })
  startOver() {
    // ToDo: Confirm this decision

    // ToDo: Wipe all setting for this user

    // ToDo: Redirect to StartChoice
    return this.$send({
      message: 'We are starting again',
      listen: false,
    });
  }
}
