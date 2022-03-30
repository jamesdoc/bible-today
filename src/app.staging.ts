import { app } from './app';
import { DynamoDb } from '@jovotech/db-DynamoDb';

/*
|--------------------------------------------------------------------------
| STAGE CONFIGURATION
|--------------------------------------------------------------------------
|
| This configuration gets merged into the default app config
| Learn more here: www.jovo.tech/docs/staging
|
*/
app.configure({
  plugins: [
    new DynamoDb({
      table: {
        name: 'BibleTodayStaging',
        createTableOnInit: true,
        primaryKeyColumn: 'id',
        readCapacityUnits: 1,
        writeCapacityUnits: 1,
      },
    }),
  ],
});

export * from './server.lambda';
