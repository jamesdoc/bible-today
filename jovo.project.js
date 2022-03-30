// const { GoogleAssistantCli } = require('@jovotech/platform-googleassistant');
const { AlexaCli } = require('@jovotech/platform-alexa');
const { ProjectConfig } = require('@jovotech/cli-core');
const { ServerlessCli } = require('@jovotech/target-serverless');

require('dotenv').config();

/*
|--------------------------------------------------------------------------
| JOVO PROJECT CONFIGURATION
|--------------------------------------------------------------------------
|
| Information used by the Jovo CLI to build and deploy projects
| Learn more here: www.jovo.tech/docs/project-config
|
*/
const project = new ProjectConfig({
  defaultStage: 'dev',

  hooks: {
    'before.build:platform': [() => console.log('Starting the build process now')],
  },

  stages: {
    dev: {
      plugins: [
        new AlexaCli({
          skillId: process.env.DEV_ALEXA_SKILL_ID,
          endpoint: process.env.DEV_ALEXA_ENDPOINT,
        }),
      ],
    },

    staging: {
      plugins: [
        new AlexaCli({
          skillId: process.env.STAGING_ALEXA_SKILL_ID,
          endpoint: process.env.STAGING_ALEXA_ENDPOINT,
        }),
      ],
    },
  },

  plugins: [
    // new GoogleAssistantCli({ projectId: '<YOUR-PROJECT-ID>' }),
    new AlexaCli({
      locales: {
        en: ['en-GB'],
        // en: ['en-AU', 'en-CA', 'en-IN', 'en-GB', 'en-US'],
      },
      askProfile: 'default',
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
    new ServerlessCli(),
  ],
});

module.exports = project;
