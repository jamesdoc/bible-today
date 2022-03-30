# Daily Bible

A small Jovo project to listen through the Bible in a year.

## Tech

- Jovo v4

## Dev set up

```sh
# Use the version of node set in .nvmrc
$ nvm use

# Install CLI globally
$ npm install -g @jovotech/cli

# Test the installation
$ jovo -v

# cd into this repo and then…
$ npm install

# Copy and fill out the .env file
$ cp .env.example .env

# Run local development server
$ jovo run
```

You can open the Jovo Debugger with the `.` key.

## Unit testing

```sh
# Run all the tests
$ npm run test
```

```sh
# Run a specific test
$ npm run test -- -t "{{test name here}}"
$ npm run test -- -t "New user should be given a choice"
```

## Deployment

### Alexa Developer Console

```sh
# Build and deploy to Alexa Console
$ jovo build:platform alexa -d
```

### Code to Lambda

In your `.aws/credentials` file add AWS creds under the `[bible-today-dev]` key.

```sh
# Deploy via serverless
$ jovo deploy:code serverless --stage staging
```
