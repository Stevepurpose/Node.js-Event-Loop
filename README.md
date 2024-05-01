# The Node.js Event Loop
The Event Loop co-ordinates the exection of synchronous and asynchronous code in Node.js.  Together with the threadpool It is a part of Libuv, which allows us run asynchronous code in Node.js. There are phases on the loop, each phase having a callback queue. The callback queue is where the event loop stores the callback function associated with an event. When all phases run we call it a cycle of the event loop or a tick of the event loop. 

The loop kicks in as soon as all synchronous code in the main thread finishes executing. The event loop pushes callbacks present in each of the queues to the main thread for execution. While it offloads heavy tasks to the threadpool. Some of these heavy tasks include DNS lookups, cryptographic operations like hashing. If these tasks are not pushed to the thredpool, they could potentially block the event loop. In the threadpool they are executed asynchronously in seperate threads.

## Phases
There are four major phases namely:
1. Timer phase has timer queue e.g `setTimeout`.
2. I/O logic e.g. file reading.
3. Check queue e.g. `setImmediate`.
4. Close queue e.g. close events.

The four phases above are a part of libuv.

There is also a microtask queue which has minor tasks that update the state of an application and should be completed 
before other activities. It has a higher priority than other task queues above and always kickstarts a new cycle. The 
microtask queue has two queues; nextTick queue and promise queue. With nextTick having a higher priority than promise.
The microtask queue is not a part of libuv.

## Event Loop Execution Order (Priority order)
There is a priority order for the execution of code in Node.js which is the following:

1. All Javascript synchronous code takes priority over asynchronous code.
2. The event loop comes in after the callstack is empty.
3. Callbacks in the microtask queue are executed. Those in the nextTick queue are executed before those in the promise queue.
4. Callbacks in the timer queue are executed.
5. The microtask queue is checked, if callbacks are present they are executed.
6. Callbacks in the I/O queue are executed.
7. The microtask queue is checked again, if callbacks are present they are executed.
8. Callbacks in the check queue are executed.
9. The microtask queue is checked again, if callbacks are present they are executed.
10. Callbacks in the close queue are executed.
11. The microtask queue is checked again, if callbacks are present they are executed.

>Note: the priority of execution between a callback of timer delay of 0ms  and that in the check queue cannot be guaranteed. Also Callback in check queue ran before that in I/O queue due to I/O operations taking time to complete. Also the subsequent microtask queue callback checks are usually done within the callbacks of other queues.