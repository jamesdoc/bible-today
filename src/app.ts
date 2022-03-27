import { GoogleAssistantPlatform } from '@jovotech/platform-googleassistant';
import { AlexaPlatform } from '@jovotech/platform-alexa';
import { App } from '@jovotech/framework';
import en from './i18n/en.json';

import { GlobalComponent } from './components/GlobalComponent';
import { AudioPlayerComponent } from './components/AudioPlayerComponent';
import { FindAudioComponent } from './components/FindAudioComponent';
import { StartChoiceComponent } from './components/StartChoiceComponent';
import { AheadComponent } from './components/AheadComponent';

/*
|--------------------------------------------------------------------------
| APP CONFIGURATION
|--------------------------------------------------------------------------
|
| All relevant components, plugins, and configurations for your Jovo app
| Learn more here: www.jovo.tech/docs/app-config
|
*/
const app = new App({
  /*
  |--------------------------------------------------------------------------
  | Components
  |--------------------------------------------------------------------------
  |
  | Components contain the Jovo app logic
  | Learn more here: www.jovo.tech/docs/components
  |
  */
  components: [
    AheadComponent,
    AudioPlayerComponent,
    FindAudioComponent,
    GlobalComponent,
    StartChoiceComponent,
  ],
  /*
  |--------------------------------------------------------------------------
  | Plugins
  |--------------------------------------------------------------------------
  |
  | Includes platforms, database integrations, third-party plugins, and more
  | Learn more here: www.jovo.tech/marketplace
  |
  */
  plugins: [
    // Add Jovo plugins here
    new GoogleAssistantPlatform(),
    new AlexaPlatform({
      intentMap: { 'AMAZON.StopIntent': 'END', 'AMAZON.CancelIntent': 'END' },
      files: {
        'skill-package/skill.json': {
          manifest: {
            apis: {
              custom: {
                interfaces: [
                  {
                    type: 'AUDIO_PLAYER',
                  },
                ],
              },
            },
          },
        },
      },
    }),
  ],

  /*
  |--------------------------------------------------------------------------
  | Other options
  |--------------------------------------------------------------------------
  |
  | Includes all other configuration options like logging
  | Learn more here: www.jovo.tech/docs/app-config
  |
  */
  logging: true,

  i18n: {
    resources: {
      en,
    },
  },
});

export { app };
