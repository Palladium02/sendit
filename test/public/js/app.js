import { SendIt } from './sendit.js';

const sendit = new SendIt({
    shouldCache: true
});

let response1 = await sendit.get('/text', { name: "test", age: "12" }, {},'text');
let [ status, error, response ] = await sendit.post('/json', {});
let [ s, e, message ] = await sendit.post('/test', {}, {},'text');

console.table(response1);
console.log(response);
console.log(message);

console.log(sendit);