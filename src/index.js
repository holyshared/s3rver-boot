import S3rver from 's3rver';
import Promise from 'bluebird';
import fs from 'fs-extra';
import path from 'path';

export default class Bootstrap {
  constructor(client, buckets) {
    this.server = null;
    this.client = client;
    this.buckets = buckets || [];
    this.stoped = true;
  }
  start() {
    return Promise.bind(this).then(function () {
      return this.startServer();
    }).then(function () {
      return this.cleanupBucket();
    }).then(function () {
      return this.createBuckets();
    }).then(function () {
      this.stoped = false;
    });
  }
  startServer() {
    var self = this;

    return new Promise(function (resolve, reject) {
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

  cleanupBucket() {
    var directory = path.resolve(this.client.options.directory);

    return new Promise(function (resolve, reject) {
      fs.remove(directory, function (err) {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  }

  createBuckets() {
    var storageDir = this.client.options.directory;

    var buckets = this.buckets.map(function (bucket) {
      return path.join(storageDir, bucket);
    }).map(function (bucketDirectory) {
      return new Promise(function (resolve, reject) {
        fs.mkdirs(bucketDirectory, function (err) {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });
    });
    return Promise.all(buckets);
  }

  stop() {
    var self = this;

    return new Promise(function (resolve) {
      self.server.close(resolve);
      self.stoped = true;
    });
  }
  get isStoped() {
    return this.stoped;
  }
  static fromOptions(options) {
    return new Bootstrap(new S3rver(options.server), options.buckets);
  }
}
