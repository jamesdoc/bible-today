import { Component, BaseComponent, Intents } from '@jovotech/framework';
import { FindAudioComponent } from './FindAudioComponent';

import { BeginningTodayOutput } from '../output/BeginningTodayOutput';
import { dayOfYear } from '../helpers/utils';

@Component()
export class StartChoiceComponent extends BaseComponent {
  START() {
    this.$user.data.plan = 'mcheyne';

    return this.$send(BeginningTodayOutput, {
      message: this.$t('StartChoice.greeting.firstTime'),
    });
  }

  @Intents(['BeginningIntent'])
  startBeginning() {
    this.$user.data.day = 1;
    this.$user.data.startDate = new Date();

    this.$send({
      message: this.$t('StartChoice.beginning'),
      listen: false,
    });

    return this.$redirect(FindAudioComponent);
  }

  @Intents(['TodayIntent'])
  startToday() {
    const today = dayOfYear(new Date());

    this.$send({
      message: this.$t('StartChoice.midway'),
      listen: false,
    });

    this.$user.data.day = today;
    this.$user.data.startDate = new Date(new Date().getFullYear(), 0, 1);

    return this.$redirect(FindAudioComponent);
  }

  UNHANDLED() {
    return this.START();
  }
}
