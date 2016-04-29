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
    return this.startServer().then(() => {
      return this.cleanupBucket();
    }).then(() => {
      return this.createBuckets();
    }).then(() => {
      this.stoped = false;
    });
  }
  startServer() {
    return new Promise((resolve, reject) => {
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
    const directory = path.resolve(this.client.options.directory);

    return new Promise((resolve, reject) => {
      fs.remove(directory, (err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  }

  createBuckets() {
    const storageDir = this.client.options.directory;

    const buckets = this.buckets.map((bucket) => {
      return path.join(storageDir, bucket);
    }).map((bucketDirectory) => {
      return new Promise((resolve, reject) => {
        fs.mkdirs(bucketDirectory, (err) => {
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
    return new Promise((resolve) => {
      this.server.close(resolve);
      this.stoped = true;
    });
  }
  get isStoped() {
    return this.stoped;
  }
  static fromOptions(options) {
    return new Bootstrap(new S3rver(options.server), options.buckets);
  }
}
