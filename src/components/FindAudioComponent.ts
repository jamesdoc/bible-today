import { Component, BaseComponent } from '@jovotech/framework';
import { AudioPlayerComponent } from './AudioPlayerComponent';
import plan from '../assets/plans/mcheyne.json';
import { dayIncrementor } from '../helpers/utils';
import { conf, IdbConfig } from '../config';

const dailyBibleConfig: IdbConfig = conf;

@Component()
export class FindAudioComponent extends BaseComponent {
  START() {
    const day = this.$user.data.day;

    if (day === 1) {
      this.$send({
        message: `This is the ${plan.meta.title}. ${plan.meta.description}.`,
        listen: false,
      });

      this.$send({
        message: `There are ${plan.meta.days} days in this plan. Each day is approximately ${plan.meta.dailyLength} long.`,
        listen: false,
      });
    }

    // Build the readings for ESV audio API
    const readings = encodeURIComponent(plan.items[day - 1].join(';'));

    this.$send({
      message: this.$t('FindAudio.today', { day }),
      listen: false,
    });

    const passageAudioUrl = dailyBibleConfig.esv_audio_url.replace('{{READINGS}}', readings);
    this.$session.data.passageAudioUrl = passageAudioUrl;

    // Increment the day count
    const newDay = dayIncrementor(day);
    this.$user.data.day = newDay;
    if (newDay === 1) {
      this.$user.data.startDate = new Date();
    }

    return this.$redirect(AudioPlayerComponent);
  }

  UNHANDLED() {
    return this.START();
  }
}
