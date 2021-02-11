const express = require('express');

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile('./html/test.html', { root: __dirname });
});

app.get('/text', (req, res) => {
    res.send('Test string');
});

app.get('/json', (req, res) => {
    let obj = {
        name: "Test Testerson"
    }
    res.json(obj);
});

app.post('/test', (req, res) => {
    res.send('Test string from post request');
});

app.post('/json', (req, res) => {
    let obj = {
        name: "Test from post"
    }
    res.json(obj);
});

app.listen(80, () => {
    console.log('Server started');
});