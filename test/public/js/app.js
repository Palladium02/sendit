import { SendIt } from './sendit.js';

const sendit = new SendIt({
    shouldCache: true
});

let response = await sendit.get('/text', { name: "test", age: "12" }, 'text');

console.table(response);

console.log(sendit);