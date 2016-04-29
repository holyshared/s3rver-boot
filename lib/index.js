'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

var Bootstrap = function () {
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
      var _this = this;

      return this.startServer().then(function () {
        return _this.cleanupBucket();
      }).then(function () {
        return _this.createBuckets();
      }).then(function () {
        _this.stoped = false;
      });
    }
  }, {
    key: 'startServer',
    value: function startServer() {
      var _this2 = this;

      return new _bluebird2.default(function (resolve, reject) {
        _this2.server = _this2.client.run(function (err, host, port) {
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
      var _this3 = this;

      return new _bluebird2.default(function (resolve) {
        _this3.server.close(resolve);
        _this3.stoped = true;
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
}();

exports.default = Bootstrap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztJQUVxQixTO0FBQ25CLHFCQUFZLE1BQVosRUFBb0IsT0FBcEIsRUFBNkI7QUFBQTs7QUFDM0IsU0FBSyxNQUFMLEdBQWMsSUFBZDtBQUNBLFNBQUssTUFBTCxHQUFjLE1BQWQ7QUFDQSxTQUFLLE9BQUwsR0FBZSxXQUFXLEVBQTFCO0FBQ0EsU0FBSyxNQUFMLEdBQWMsSUFBZDtBQUNEOzs7OzRCQUNPO0FBQUE7O0FBQ04sYUFBTyxLQUFLLFdBQUwsR0FBbUIsSUFBbkIsQ0FBd0IsWUFBTTtBQUNuQyxlQUFPLE1BQUssYUFBTCxFQUFQO0FBQ0QsT0FGTSxFQUVKLElBRkksQ0FFQyxZQUFNO0FBQ1osZUFBTyxNQUFLLGFBQUwsRUFBUDtBQUNELE9BSk0sRUFJSixJQUpJLENBSUMsWUFBTTtBQUNaLGNBQUssTUFBTCxHQUFjLEtBQWQ7QUFDRCxPQU5NLENBQVA7QUFPRDs7O2tDQUNhO0FBQUE7O0FBQ1osYUFBTyx1QkFBWSxVQUFDLE9BQUQsRUFBVSxNQUFWLEVBQXFCO0FBQ3RDLGVBQUssTUFBTCxHQUFjLE9BQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsVUFBQyxHQUFELEVBQU0sSUFBTixFQUFZLElBQVosRUFBcUI7QUFDakQsY0FBSSxHQUFKLEVBQVM7QUFDUCxtQkFBTyxPQUFPLEdBQVAsQ0FBUDtBQUNEO0FBQ0Qsa0JBQVE7QUFDTixrQkFBTSxJQURBO0FBRU4sa0JBQU07QUFGQSxXQUFSO0FBSUQsU0FSYSxDQUFkO0FBU0QsT0FWTSxDQUFQO0FBV0Q7OztvQ0FFZTtBQUNkLFVBQU0sWUFBWSxlQUFLLE9BQUwsQ0FBYSxLQUFLLE1BQUwsQ0FBWSxPQUFaLENBQW9CLFNBQWpDLENBQWxCOztBQUVBLGFBQU8sdUJBQVksVUFBQyxPQUFELEVBQVUsTUFBVixFQUFxQjtBQUN0QywwQkFBRyxNQUFILENBQVUsU0FBVixFQUFxQixVQUFDLEdBQUQsRUFBUztBQUM1QixjQUFJLEdBQUosRUFBUztBQUNQLG1CQUFPLE9BQU8sR0FBUCxDQUFQO0FBQ0Q7QUFDRDtBQUNELFNBTEQ7QUFNRCxPQVBNLENBQVA7QUFRRDs7O29DQUVlO0FBQ2QsVUFBTSxhQUFhLEtBQUssTUFBTCxDQUFZLE9BQVosQ0FBb0IsU0FBdkM7O0FBRUEsVUFBTSxVQUFVLEtBQUssT0FBTCxDQUFhLEdBQWIsQ0FBaUIsVUFBQyxNQUFELEVBQVk7QUFDM0MsZUFBTyxlQUFLLElBQUwsQ0FBVSxVQUFWLEVBQXNCLE1BQXRCLENBQVA7QUFDRCxPQUZlLEVBRWIsR0FGYSxDQUVULFVBQUMsZUFBRCxFQUFxQjtBQUMxQixlQUFPLHVCQUFZLFVBQUMsT0FBRCxFQUFVLE1BQVYsRUFBcUI7QUFDdEMsNEJBQUcsTUFBSCxDQUFVLGVBQVYsRUFBMkIsVUFBQyxHQUFELEVBQVM7QUFDbEMsZ0JBQUksR0FBSixFQUFTO0FBQ1AscUJBQU8sT0FBTyxHQUFQLENBQVA7QUFDRDtBQUNEO0FBQ0QsV0FMRDtBQU1ELFNBUE0sQ0FBUDtBQVFELE9BWGUsQ0FBaEI7QUFZQSxhQUFPLG1CQUFRLEdBQVIsQ0FBWSxPQUFaLENBQVA7QUFDRDs7OzJCQUVNO0FBQUE7O0FBQ0wsYUFBTyx1QkFBWSxVQUFDLE9BQUQsRUFBYTtBQUM5QixlQUFLLE1BQUwsQ0FBWSxLQUFaLENBQWtCLE9BQWxCO0FBQ0EsZUFBSyxNQUFMLEdBQWMsSUFBZDtBQUNELE9BSE0sQ0FBUDtBQUlEOzs7d0JBQ2M7QUFDYixhQUFPLEtBQUssTUFBWjtBQUNEOzs7Z0NBQ2tCLE8sRUFBUztBQUMxQixhQUFPLElBQUksU0FBSixDQUFjLHFCQUFXLFFBQVEsTUFBbkIsQ0FBZCxFQUEwQyxRQUFRLE9BQWxELENBQVA7QUFDRDs7Ozs7O2tCQXhFa0IsUyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTM3J2ZXIgZnJvbSAnczNydmVyJztcbmltcG9ydCBQcm9taXNlIGZyb20gJ2JsdWViaXJkJztcbmltcG9ydCBmcyBmcm9tICdmcy1leHRyYSc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm9vdHN0cmFwIHtcbiAgY29uc3RydWN0b3IoY2xpZW50LCBidWNrZXRzKSB7XG4gICAgdGhpcy5zZXJ2ZXIgPSBudWxsO1xuICAgIHRoaXMuY2xpZW50ID0gY2xpZW50O1xuICAgIHRoaXMuYnVja2V0cyA9IGJ1Y2tldHMgfHwgW107XG4gICAgdGhpcy5zdG9wZWQgPSB0cnVlO1xuICB9XG4gIHN0YXJ0KCkge1xuICAgIHJldHVybiB0aGlzLnN0YXJ0U2VydmVyKCkudGhlbigoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5jbGVhbnVwQnVja2V0KCk7XG4gICAgfSkudGhlbigoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5jcmVhdGVCdWNrZXRzKCk7XG4gICAgfSkudGhlbigoKSA9PiB7XG4gICAgICB0aGlzLnN0b3BlZCA9IGZhbHNlO1xuICAgIH0pO1xuICB9XG4gIHN0YXJ0U2VydmVyKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLnNlcnZlciA9IHRoaXMuY2xpZW50LnJ1bigoZXJyLCBob3N0LCBwb3J0KSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgIH1cbiAgICAgICAgcmVzb2x2ZSh7XG4gICAgICAgICAgaG9zdDogaG9zdCxcbiAgICAgICAgICBwb3J0OiBwb3J0XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBjbGVhbnVwQnVja2V0KCkge1xuICAgIGNvbnN0IGRpcmVjdG9yeSA9IHBhdGgucmVzb2x2ZSh0aGlzLmNsaWVudC5vcHRpb25zLmRpcmVjdG9yeSk7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgZnMucmVtb3ZlKGRpcmVjdG9yeSwgKGVycikgPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICB9XG4gICAgICAgIHJlc29sdmUoKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgY3JlYXRlQnVja2V0cygpIHtcbiAgICBjb25zdCBzdG9yYWdlRGlyID0gdGhpcy5jbGllbnQub3B0aW9ucy5kaXJlY3Rvcnk7XG5cbiAgICBjb25zdCBidWNrZXRzID0gdGhpcy5idWNrZXRzLm1hcCgoYnVja2V0KSA9PiB7XG4gICAgICByZXR1cm4gcGF0aC5qb2luKHN0b3JhZ2VEaXIsIGJ1Y2tldCk7XG4gICAgfSkubWFwKChidWNrZXREaXJlY3RvcnkpID0+IHtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGZzLm1rZGlycyhidWNrZXREaXJlY3RvcnksIChlcnIpID0+IHtcbiAgICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVqZWN0KGVycik7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gUHJvbWlzZS5hbGwoYnVja2V0cyk7XG4gIH1cblxuICBzdG9wKCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuICAgICAgdGhpcy5zZXJ2ZXIuY2xvc2UocmVzb2x2ZSk7XG4gICAgICB0aGlzLnN0b3BlZCA9IHRydWU7XG4gICAgfSk7XG4gIH1cbiAgZ2V0IGlzU3RvcGVkKCkge1xuICAgIHJldHVybiB0aGlzLnN0b3BlZDtcbiAgfVxuICBzdGF0aWMgZnJvbU9wdGlvbnMob3B0aW9ucykge1xuICAgIHJldHVybiBuZXcgQm9vdHN0cmFwKG5ldyBTM3J2ZXIob3B0aW9ucy5zZXJ2ZXIpLCBvcHRpb25zLmJ1Y2tldHMpO1xuICB9XG59XG4iXX0=