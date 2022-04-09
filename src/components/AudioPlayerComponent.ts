import { Component, BaseComponent, Global, Handle, Intents } from '@jovotech/framework';
import {
  AlexaHandles,
  AudioPlayerPlayOutput,
  AudioPlayerStopOutput,
} from '@jovotech/platform-alexa';

@Global()
@Component()
export class AudioPlayerComponent extends BaseComponent {
  START() {
    return this.$send(AudioPlayerPlayOutput, {
      // message: 'Starting audio',
      audioItem: {
        stream: {
          url: this.$session.data.passageAudioUrl,
        },
      },
    });
  }

  @Intents(['AMAZON.ResumeIntent'])
  resumeAudio() {
    return this.$send(AudioPlayerPlayOutput, {
      // message: 'Continuing audio',
      audioItem: {
        stream: {
          url: this.$session.data.passageAudioUrl,
          offsetInMilliseconds: this.$user.data.audioPlayerOffset,
        },
      },
    });
  }

  @Intents(['AMAZON.PauseIntent'])
  END() {
    return this.$send(AudioPlayerStopOutput);
  }

  // @Handle(AlexaHandles.onAudioPlayer('AudioPlayer.PlaybackStarted'))
  // playbackStarted() {
  //   console.log('AudioPlayer.PlaybackStarted');
  // }

  // @Handle(AlexaHandles.onAudioPlayer('AudioPlayer.PlaybackNearlyFinished'))
  // playbackNearlyFinished() {
  //   console.log('AudioPlayer.PlaybackNearlyFinished');
  // }

  // @Handle(AlexaHandles.onAudioPlayer('AudioPlayer.PlaybackFailed'))
  // playbackFailed() {
  //   const error = this.$alexa!.audioPlayer.error;
  //   console.log('AudioPlayer.PlaybackFailed', error?.type, error?.message);
  // }

  // @Handle(AlexaHandles.onAudioPlayer('AudioPlayer.PlaybackStopped'))
  // playbackStopped() {
  //   // this.$user.data.audioPlayerOffset = this.$alexa!.audioPlayer?.offsetInMilliseconds;
  //   console.log('Saved audioPlayerOffset:', this.$user.data.audioPlayerOffset + ' ms');
  //   console.log('AudioPlayer.PlaybackStopped');
  // }

  // @Handle(AlexaHandles.onAudioPlayer('AudioPlayer.PlaybackFinished'))
  // playbackFinished() {
  //   console.log('AudioPlayer.PlaybackFinished');
  // }
}
