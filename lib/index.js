'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _s3rver = require('s3rver');

var _s3rver2 = _interopRequireDefault(_s3rver);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bootstrap = (function () {
  function Bootstrap(client, buckets) {
    _classCallCheck(this, Bootstrap);

    this.server = null;
    this.client = client;
    this.buckets = buckets || [];
    this.stoped = true;
  }

  _createClass(Bootstrap, [{
    key: 'start',
    value: function start() {
      return _bluebird2.default.bind(this).then(function () {
        return this.startServer();
      }).then(function () {
        return this.cleanupBucket();
      }).then(function () {
        return this.createBuckets();
      }).then(function () {
        this.stoped = false;
      });
    }
  }, {
    key: 'startServer',
    value: function startServer() {
      var self = this;

      return new _bluebird2.default(function (resolve, reject) {
        self.server = self.client.run(function (err, host, port) {
          if (err) {
            return reject(err);
          }
          resolve({
            host: host,
            port: port
          });
        });
      });
    }
  }, {
    key: 'cleanupBucket',
    value: function cleanupBucket() {
      var directory = _path2.default.resolve(this.client.options.directory);

      return new _bluebird2.default(function (resolve, reject) {
        _fsExtra2.default.remove(directory, function (err) {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });
    }
  }, {
    key: 'createBuckets',
    value: function createBuckets() {
      var storageDir = this.client.options.directory;

      var buckets = this.buckets.map(function (bucket) {
        return _path2.default.join(storageDir, bucket);
      }).map(function (bucketDirectory) {
        return new _bluebird2.default(function (resolve, reject) {
          _fsExtra2.default.mkdirs(bucketDirectory, function (err) {
            if (err) {
              return reject(err);
            }
            resolve();
          });
        });
      });
      return _bluebird2.default.all(buckets);
    }
  }, {
    key: 'stop',
    value: function stop() {
      var self = this;

      return new _bluebird2.default(function (resolve) {
        self.server.close(resolve);
        self.stoped = true;
      });
    }
  }, {
    key: 'isStoped',
    get: function get() {
      return this.stoped;
    }
  }], [{
    key: 'fromOptions',
    value: function fromOptions(options) {
      return new Bootstrap(new _s3rver2.default(options.server), options.buckets);
    }
  }]);

  return Bootstrap;
})();

exports.default = Bootstrap;
//# sourceMappingURL=data:application/json;base64,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VUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDOztBQUVoQixhQUFPLHVCQUFZLFVBQVUsT0FBTyxFQUFFO0FBQ3BDLFlBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQzNCLFlBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO09BQ3BCLENBQUMsQ0FBQztLQUNKOzs7d0JBQ2M7QUFDYixhQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7S0FDcEI7OztnQ0FDa0IsT0FBTyxFQUFFO0FBQzFCLGFBQU8sSUFBSSxTQUFTLENBQUMscUJBQVcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNuRTs7O1NBOUVrQixTQUFTOzs7a0JBQVQsU0FBUyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTM3J2ZXIgZnJvbSAnczNydmVyJztcbmltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCBmcyBmcm9tICdmcy1leHRyYSc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9vdHN0cmFwIHtcbiAgY29uc3RydWN0b3IoY2xpZW50LCBidWNrZXRzKSB7XG4gICAgdGhpcy5zZXJ2ZXIgPSBudWxsO1xuICAgIHRoaXMuY2xpZW50ID0gY2xpZW50O1xuICAgIHRoaXMuYnVja2V0cyA9IGJ1Y2tldHMgfHwgW107XG4gICAgdGhpcy5zdG9wZWQgPSB0cnVlO1xuICB9XG4gIHN0YXJ0KCkge1xuICAgIHJldHVybiBQcm9taXNlLmJpbmQodGhpcykudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcy5zdGFydFNlcnZlcigpO1xuICAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuY2xlYW51cEJ1Y2tldCgpO1xuICAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlQnVja2V0cygpO1xuICAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5zdG9wZWQgPSBmYWxzZTtcbiAgICB9KTtcbiAgfVxuICBzdGFydFNlcnZlcigpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgc2VsZi5zZXJ2ZXIgPSBzZWxmLmNsaWVudC5ydW4oZnVuY3Rpb24gKGVyciwgaG9zdCwgcG9ydCkge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICB9XG4gICAgICAgIHJlc29sdmUoe1xuICAgICAgICAgIGhvc3Q6IGhvc3QsXG4gICAgICAgICAgcG9ydDogcG9ydFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgY2xlYW51cEJ1Y2tldCgpIHtcbiAgICB2YXIgZGlyZWN0b3J5ID0gcGF0aC5yZXNvbHZlKHRoaXMuY2xpZW50Lm9wdGlvbnMuZGlyZWN0b3J5KTtcblxuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICBmcy5yZW1vdmUoZGlyZWN0b3J5LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgIH1cbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBjcmVhdGVCdWNrZXRzKCkge1xuICAgIHZhciBzdG9yYWdlRGlyID0gdGhpcy5jbGllbnQub3B0aW9ucy5kaXJlY3Rvcnk7XG5cbiAgICB2YXIgYnVja2V0cyA9IHRoaXMuYnVja2V0cy5tYXAoZnVuY3Rpb24gKGJ1Y2tldCkge1xuICAgICAgcmV0dXJuIHBhdGguam9pbihzdG9yYWdlRGlyLCBidWNrZXQpO1xuICAgIH0pLm1hcChmdW5jdGlvbiAoYnVja2V0RGlyZWN0b3J5KSB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBmcy5ta2RpcnMoYnVja2V0RGlyZWN0b3J5LCBmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIFByb21pc2UuYWxsKGJ1Y2tldHMpO1xuICB9XG5cbiAgc3RvcCgpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgIHNlbGYuc2VydmVyLmNsb3NlKHJlc29sdmUpO1xuICAgICAgc2VsZi5zdG9wZWQgPSB0cnVlO1xuICAgIH0pO1xuICB9XG4gIGdldCBpc1N0b3BlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5zdG9wZWQ7XG4gIH1cbiAgc3RhdGljIGZyb21PcHRpb25zKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IEJvb3RzdHJhcChuZXcgUzNydmVyKG9wdGlvbnMuc2VydmVyKSwgb3B0aW9ucy5idWNrZXRzKTtcbiAgfVxufVxuIl19