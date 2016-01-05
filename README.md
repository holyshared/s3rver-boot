# s3rver-boot

[![Build Status](https://travis-ci.org/holyshared/s3rver-boot.svg?branch=master)](https://travis-ci.org/holyshared/s3rver-boot)

## Basic usage

```js
import s3rver from 's3rver-boot';

const server = s3rver.fromOptions({
  buckets: [ 'test' ],
  server: {
    hostname: 'localhost',
    port: 4569,
    silent: false,
    directory: './tmp'
  }
});

server.start().then(() => {
  console.log('server started');
});

server.stop().then(() => {
  console.log('server stoped');
});
```

## Unit tests for mocha

```js
import s3rver from 's3rver-boot';

const server = s3rver.fromOptions({
  buckets: [ 'test' ], // default buckets
  server: {
    hostname: 'localhost',
    port: 4569,
    silent: false,
    directory: './tmp'
  }
});

before(() => {
  return server.start();
});

after(() => {
  return server.stop();
});
```

## Run the test

	npm install
	npm test
