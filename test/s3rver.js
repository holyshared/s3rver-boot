var Bootstrap = require('../lib/index').default;

describe('Bootstrap', function () {
  describe('start()', function () {
    before(function () {
      this.bootstrap = Bootstrap.fromOptions({
        buckets: [ 'test' ],
        server: {
          hostname: 'localhost',
          port: 4569,
          silent: false,
          directory: './tmp'
        }
      });
      return this.bootstrap.start();
    });
    it('should default bucket created', function (done) {
      var backetPath = path.join('./tmp', 'test');

      fs.stat(backetPath, function (err, result) {
        assert.ok(result.isDirectory());
        done();
      });
    });
    it('should be server able to upload', function (done) {
      var client = s3.createClient({
        s3Client: new AWS.S3({
          accessKeyId: '123',
          secretAccessKey: 'abc'
        })
      });
      var uploader = client.uploadFile({
        localFile: './test/fixtures/test.txt',
        s3Params: {
          Bucket: "test",
          Key: "test.txt"
        }
      });
      uploader.on('error', done);
      uploader.on('end', function (result) {
        assert.ok(result.Etag !== null);
        done();
      });
    });
  });

  describe('stop()', function () {
    beforeEach(function () {
      this.bootstrap = Bootstrap.fromOptions({
        buckets: [ 'test' ],
        server: {
          hostname: 'localhost',
          port: 4570,
          silent: false,
          directory: './tmp'
        }
      });
      return this.bootstrap.start();
    });
    it('should server stoped', function () {
      var bootstrap = this.bootstrap;

      bootstrap.stop().then(function () {
        assert.ok(bootstrap.isStoped);
      });
    });
  });
});
