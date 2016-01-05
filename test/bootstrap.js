var util = require('util');
var AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: '123',
  secretAccessKey: 'abc',
  endpoint: util.format('%s:%d', 'localhost', 4569), // test only
  sslEnabled: false,  // test only
  s3ForcePathStyle: true  // test only
});
