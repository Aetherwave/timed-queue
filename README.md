# Timed Queue

[![Build Status](https://travis-ci.org/Aetherwave/timed-queue.svg)](https://travis-ci.org/Aetherwave/timed-queue) [![Dependency Status](https://david-dm.org/Aetherwave/timed-queue.svg)](https://david-dm.org/Aetherwave/timed-queue)

Get objects only after timeout, sorted by timeout (longest expiration first).

## Install

    npm install @aetherwave/timed-queue

## Usage

    let queue = new TimedQueue();
    queue.enqueue(999, 'Hello World');

    console.log(queue.dequeue()); // -> null

    setTimeout(function () {
      console.log(queue.dequeue()); // -> Hello World
    }, 1000);

### TimedQueue#enqueue(timeout, obj)

Enqueues object with timeout

### TimedQueue#dequeue()

- If there is one or more item with timeout lower than the current timestamp, this object gets dequeued
- Else `null` is going to be returned

### TimedQueue#length

Returns length of the queue

## Test

**Run tests**

    $ npm test
