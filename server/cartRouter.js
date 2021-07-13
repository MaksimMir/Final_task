const express = require('express');
const fs = require('fs');
const router = express.Router();
const handler = require('./hendler');

router.get('/', (req, res) => {
    fs.readFile('server/db/userCart.json', 'UTF-8', (err, data) => {
        if (err) {
            res(404, JSON.stringify({result: 0, text: err}));
        } else {
            res.send(data);
        }
    })
});

router.post('/', (req, res) => {
    handler(req, res, 'add', 'server/db/userCart.json');
});

router.put('/:id', (req, res) => {
    handler(req, res, 'change', 'server/db/userCart.json');
});

router.delete('/:id', (req, res) => {
    handler(req, res, 'remove', 'server/db/userCart.json');
});

module.exports = router;