'use strict';
/* jslint node: true, esnext: true */

let _ = require('lodash');

class TimedQueue {
  constructor() {
    this.queue = [];
  }

  enqueue(timeout, obj) {
    this.queue.push({ timeout: timeout, obj: obj });
    this.queue = _.sortByOrder(this.queue, 'timeout', 'desc');
  }

  dequeue() {
    let currentTimestamp = Date.now();
    let queueItem = this.peek();

    if(queueItem) {
      if(queueItem.timeout < currentTimestamp) {
        this.queue.pop();
        return queueItem.obj;
      }
    }

    return null;
  }

  peek() {
    return _.last(this.queue);
  }

  get length() {
    return this.queue.length;
  }
}

module.exports = TimedQueue;
