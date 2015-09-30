# Timed Queue

Get objects only after timeout, sorted by timeout (longest expiration first).

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

**Environment**

- `TEST_DB`: MongoDB connection string

**Run tests**

    $ npm test
