const fs = require('fs');
const crypto = require('crypto');

const start = Date.now();
process.env.UV_THREADPOOL_SIZE = 5;
console.log('size', process.env.UV_THREADPOOL_SIZE);

setTimeout(() => console.log('Timer 1 is finished'), 0);
setImmediate(() => console.log('Immediate 1 is finished..'));

fs.readFile('./txt/final.txt', () => {
  console.log('I/O finished');
  console.log('-----------------');

  setTimeout(() => console.log('Timer 2 is finished'), 0);
  setTimeout(() => console.log('Timer 3 is finished'), 3000);
  setImmediate(() => console.log('Immediate 2 is finished..'));

  process.nextTick(() => console.log('i am next Tick!'));

  // its working on thread pool thread pool size is four

  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'password is encrypted!');
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'password is encrypted!');
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'password is encrypted!');
  });
  crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
    console.log(Date.now() - start, 'password is encrypted!');
  });
});

console.log('I am top-level code ');
