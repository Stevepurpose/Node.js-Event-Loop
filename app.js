const fs = require('fs')

fs.readFile('./say.txt', callback)  //I/O queue 
function callback(err, data){
  if(err){
    console.log("error reading from file", err)
  }

  console.log(String(data))

  setTimeout(callName, 0)  //timer queue
  function callName(){
    console.log("This timer is in read File")
  }

  process.nextTick(()=>console.log("This is a tick in read file ")) //microtask queue 
}

console.log("Studying the Node.js event loop") //javascript synchronous code priority

function sum(a, b){   //javascript synchronous code priority
  console.log(a + b)
}
sum(2, 3)


console.log("asynchronousity and the role of libuv") //javascript synchronous code priority

//all callbacks in nextTick queue are executed before those in promise queue
// nextTick queue and Promise queue are microtask queues
process.nextTick(()=>console.log("This is a next tick")) //microtask queue 
Promise.resolve().then(()=>console.log("Take a gift")) //microtask  queue
process.nextTick(()=>console.log("This is a next tick 2")) //microtask queue 

setTimeout(callName, 0)  //timer queue
function callName(){
  console.log("steve")
}

setTimeout(callFigure, 0)  //timer queue
function callFigure(){
  console.log(5)
  process.nextTick(()=>console.log("This is a next tick inside timeout")) //microtask queue inside setTimeout
}

setTimeout(callNumber, 0) //timer queue
function callNumber(){
  console.log(10)
}

setImmediate(()=>{  //check queue
 console.log("SET IMMEDIATE")
})

