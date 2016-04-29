'use strict';

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

class Bootstrap {
  constructor(client, buckets) {
    this.server = null;
    this.client = client;
    this.buckets = buckets || [];
    this.stoped = true;
  }
  start() {
    return this.startServer().then(() => {
      return this.cleanupBucket();
    }).then(() => {
      return this.createBuckets();
    }).then(() => {
      this.stoped = false;
    });
  }
  startServer() {
    return new _bluebird2.default((resolve, reject) => {
      this.server = this.client.run((err, host, port) => {
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

  cleanupBucket() {
    const directory = _path2.default.resolve(this.client.options.directory);

    return new _bluebird2.default((resolve, reject) => {
      _fsExtra2.default.remove(directory, err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  }

  createBuckets() {
    const storageDir = this.client.options.directory;

    const buckets = this.buckets.map(bucket => {
      return _path2.default.join(storageDir, bucket);
    }).map(bucketDirectory => {
      return new _bluebird2.default((resolve, reject) => {
        _fsExtra2.default.mkdirs(bucketDirectory, err => {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });
    });
    return _bluebird2.default.all(buckets);
  }

  stop() {
    return new _bluebird2.default(resolve => {
      this.server.close(resolve);
      this.stoped = true;
    });
  }
  get isStoped() {
    return this.stoped;
  }
  static fromOptions(options) {
    return new Bootstrap(new _s3rver2.default(options.server), options.buckets);
  }
}
exports.default = Bootstrap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRWUsTUFBTSxTQUFOLENBQWdCO0FBQzdCLGNBQVksTUFBWixFQUFvQixPQUFwQixFQUE2QjtBQUMzQixTQUFLLE1BQUwsR0FBYyxJQUFkO0FBQ0EsU0FBSyxNQUFMLEdBQWMsTUFBZDtBQUNBLFNBQUssT0FBTCxHQUFlLFdBQVcsRUFBMUI7QUFDQSxTQUFLLE1BQUwsR0FBYyxJQUFkO0FBQ0Q7QUFDRCxVQUFRO0FBQ04sV0FBTyxLQUFLLFdBQUwsR0FBbUIsSUFBbkIsQ0FBd0IsTUFBTTtBQUNuQyxhQUFPLEtBQUssYUFBTCxFQUFQO0FBQ0QsS0FGTSxFQUVKLElBRkksQ0FFQyxNQUFNO0FBQ1osYUFBTyxLQUFLLGFBQUwsRUFBUDtBQUNELEtBSk0sRUFJSixJQUpJLENBSUMsTUFBTTtBQUNaLFdBQUssTUFBTCxHQUFjLEtBQWQ7QUFDRCxLQU5NLENBQVA7QUFPRDtBQUNELGdCQUFjO0FBQ1osV0FBTyx1QkFBWSxDQUFDLE9BQUQsRUFBVSxNQUFWLEtBQXFCO0FBQ3RDLFdBQUssTUFBTCxHQUFjLEtBQUssTUFBTCxDQUFZLEdBQVosQ0FBZ0IsQ0FBQyxHQUFELEVBQU0sSUFBTixFQUFZLElBQVosS0FBcUI7QUFDakQsWUFBSSxHQUFKLEVBQVM7QUFDUCxpQkFBTyxPQUFPLEdBQVAsQ0FBUDtBQUNEO0FBQ0QsZ0JBQVE7QUFDTixnQkFBTSxJQURBO0FBRU4sZ0JBQU07QUFGQSxTQUFSO0FBSUQsT0FSYSxDQUFkO0FBU0QsS0FWTSxDQUFQO0FBV0Q7O0FBRUQsa0JBQWdCO0FBQ2QsVUFBTSxZQUFZLGVBQUssT0FBTCxDQUFhLEtBQUssTUFBTCxDQUFZLE9BQVosQ0FBb0IsU0FBakMsQ0FBbEI7O0FBRUEsV0FBTyx1QkFBWSxDQUFDLE9BQUQsRUFBVSxNQUFWLEtBQXFCO0FBQ3RDLHdCQUFHLE1BQUgsQ0FBVSxTQUFWLEVBQXNCLEdBQUQsSUFBUztBQUM1QixZQUFJLEdBQUosRUFBUztBQUNQLGlCQUFPLE9BQU8sR0FBUCxDQUFQO0FBQ0Q7QUFDRDtBQUNELE9BTEQ7QUFNRCxLQVBNLENBQVA7QUFRRDs7QUFFRCxrQkFBZ0I7QUFDZCxVQUFNLGFBQWEsS0FBSyxNQUFMLENBQVksT0FBWixDQUFvQixTQUF2Qzs7QUFFQSxVQUFNLFVBQVUsS0FBSyxPQUFMLENBQWEsR0FBYixDQUFrQixNQUFELElBQVk7QUFDM0MsYUFBTyxlQUFLLElBQUwsQ0FBVSxVQUFWLEVBQXNCLE1BQXRCLENBQVA7QUFDRCxLQUZlLEVBRWIsR0FGYSxDQUVSLGVBQUQsSUFBcUI7QUFDMUIsYUFBTyx1QkFBWSxDQUFDLE9BQUQsRUFBVSxNQUFWLEtBQXFCO0FBQ3RDLDBCQUFHLE1BQUgsQ0FBVSxlQUFWLEVBQTRCLEdBQUQsSUFBUztBQUNsQyxjQUFJLEdBQUosRUFBUztBQUNQLG1CQUFPLE9BQU8sR0FBUCxDQUFQO0FBQ0Q7QUFDRDtBQUNELFNBTEQ7QUFNRCxPQVBNLENBQVA7QUFRRCxLQVhlLENBQWhCO0FBWUEsV0FBTyxtQkFBUSxHQUFSLENBQVksT0FBWixDQUFQO0FBQ0Q7O0FBRUQsU0FBTztBQUNMLFdBQU8sdUJBQWEsT0FBRCxJQUFhO0FBQzlCLFdBQUssTUFBTCxDQUFZLEtBQVosQ0FBa0IsT0FBbEI7QUFDQSxXQUFLLE1BQUwsR0FBYyxJQUFkO0FBQ0QsS0FITSxDQUFQO0FBSUQ7QUFDRCxNQUFJLFFBQUosR0FBZTtBQUNiLFdBQU8sS0FBSyxNQUFaO0FBQ0Q7QUFDRCxTQUFPLFdBQVAsQ0FBbUIsT0FBbkIsRUFBNEI7QUFDMUIsV0FBTyxJQUFJLFNBQUosQ0FBYyxxQkFBVyxRQUFRLE1BQW5CLENBQWQsRUFBMEMsUUFBUSxPQUFsRCxDQUFQO0FBQ0Q7QUF4RTRCO2tCQUFWLFMiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUzNydmVyIGZyb20gJ3MzcnZlcic7XG5pbXBvcnQgUHJvbWlzZSBmcm9tICdibHVlYmlyZCc7XG5pbXBvcnQgZnMgZnJvbSAnZnMtZXh0cmEnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJvb3RzdHJhcCB7XG4gIGNvbnN0cnVjdG9yKGNsaWVudCwgYnVja2V0cykge1xuICAgIHRoaXMuc2VydmVyID0gbnVsbDtcbiAgICB0aGlzLmNsaWVudCA9IGNsaWVudDtcbiAgICB0aGlzLmJ1Y2tldHMgPSBidWNrZXRzIHx8IFtdO1xuICAgIHRoaXMuc3RvcGVkID0gdHJ1ZTtcbiAgfVxuICBzdGFydCgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGFydFNlcnZlcigpLnRoZW4oKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuY2xlYW51cEJ1Y2tldCgpO1xuICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuY3JlYXRlQnVja2V0cygpO1xuICAgIH0pLnRoZW4oKCkgPT4ge1xuICAgICAgdGhpcy5zdG9wZWQgPSBmYWxzZTtcbiAgICB9KTtcbiAgfVxuICBzdGFydFNlcnZlcigpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgdGhpcy5zZXJ2ZXIgPSB0aGlzLmNsaWVudC5ydW4oKGVyciwgaG9zdCwgcG9ydCkgPT4ge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICB9XG4gICAgICAgIHJlc29sdmUoe1xuICAgICAgICAgIGhvc3Q6IGhvc3QsXG4gICAgICAgICAgcG9ydDogcG9ydFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgY2xlYW51cEJ1Y2tldCgpIHtcbiAgICBjb25zdCBkaXJlY3RvcnkgPSBwYXRoLnJlc29sdmUodGhpcy5jbGllbnQub3B0aW9ucy5kaXJlY3RvcnkpO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGZzLnJlbW92ZShkaXJlY3RvcnksIChlcnIpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIHJldHVybiByZWplY3QoZXJyKTtcbiAgICAgICAgfVxuICAgICAgICByZXNvbHZlKCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGNyZWF0ZUJ1Y2tldHMoKSB7XG4gICAgY29uc3Qgc3RvcmFnZURpciA9IHRoaXMuY2xpZW50Lm9wdGlvbnMuZGlyZWN0b3J5O1xuXG4gICAgY29uc3QgYnVja2V0cyA9IHRoaXMuYnVja2V0cy5tYXAoKGJ1Y2tldCkgPT4ge1xuICAgICAgcmV0dXJuIHBhdGguam9pbihzdG9yYWdlRGlyLCBidWNrZXQpO1xuICAgIH0pLm1hcCgoYnVja2V0RGlyZWN0b3J5KSA9PiB7XG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBmcy5ta2RpcnMoYnVja2V0RGlyZWN0b3J5LCAoZXJyKSA9PiB7XG4gICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgcmV0dXJuIHJlamVjdChlcnIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIFByb21pc2UuYWxsKGJ1Y2tldHMpO1xuICB9XG5cbiAgc3RvcCgpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHtcbiAgICAgIHRoaXMuc2VydmVyLmNsb3NlKHJlc29sdmUpO1xuICAgICAgdGhpcy5zdG9wZWQgPSB0cnVlO1xuICAgIH0pO1xuICB9XG4gIGdldCBpc1N0b3BlZCgpIHtcbiAgICByZXR1cm4gdGhpcy5zdG9wZWQ7XG4gIH1cbiAgc3RhdGljIGZyb21PcHRpb25zKG9wdGlvbnMpIHtcbiAgICByZXR1cm4gbmV3IEJvb3RzdHJhcChuZXcgUzNydmVyKG9wdGlvbnMuc2VydmVyKSwgb3B0aW9ucy5idWNrZXRzKTtcbiAgfVxufVxuIl19