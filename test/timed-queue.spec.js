'use strict';
/* jslint node: true, esnext: true, -W030 */
/* global describe, it, beforeEach, afterEach */

let chai = require('chai');
let expect = chai.expect;
let sinon = require('sinon');

describe('Timed Queue', function () {
  let TimedQueue = require(process.cwd() + '/index.js');
  let clock;

  beforeEach(function () {
    clock = sinon.useFakeTimers(0, 'Date');
  });

  afterEach(function () {
    clock.restore();
  });

  it('should get objects only after timeout', function () {
    let queue = new TimedQueue();

    queue.enqueue(10, 'timeout 10');
    queue.enqueue(100, 'timeout 100');
    queue.enqueue(50, 'timeout 50');

    expect(queue.dequeue()).to.be.null;

    clock.tick(10);
    expect(queue.dequeue()).to.be.null;

    clock.tick(1);
    expect(queue.dequeue()).to.be.equal('timeout 10');
    expect(queue.dequeue()).to.be.null;

    clock.tick(39);
    expect(queue.dequeue()).to.be.null;

    clock.tick(1);
    expect(queue.dequeue()).to.be.equal('timeout 50');
    expect(queue.dequeue()).to.be.null;

    queue.enqueue(70, 'timeout 70');
    queue.enqueue(69, 'timeout 69');
    expect(queue.dequeue()).to.be.null;

    clock.tick(20);
    expect(queue.dequeue()).to.be.equal('timeout 69');
    expect(queue.dequeue()).to.be.equal('timeout 70');

    clock.tick(29);
    expect(queue.dequeue()).to.be.null;

    clock.tick(1);
    expect(queue.dequeue()).to.be.equal('timeout 100');
    expect(queue.dequeue()).to.be.null;
  });

  it('should get length of the queue', function () {
    let queue = new TimedQueue();
    expect(queue.length).to.be.equal(0);

    queue.enqueue(10, 'timeout 10');
    queue.enqueue(100, 'timeout 100');
    queue.enqueue(50, 'timeout 50');
    expect(queue.length).to.be.equal(3);

    clock.tick(10);
    queue.dequeue();
    expect(queue.length).to.be.equal(3);

    clock.tick(1);
    queue.dequeue();
    expect(queue.length).to.be.equal(2);
  });

});
