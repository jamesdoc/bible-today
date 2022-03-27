const { DebuggerConfig } = require('@jovotech/plugin-debugger');

const debuggerConfig = new DebuggerConfig({
  locales: ['en'],
  buttons: [
    {
      label: 'Launch Daily Bible',
      input: {
        type: 'LAUNCH',
      },
    },
    // ...
  ],
});

module.exports = debuggerConfig;
