const express = require('express');
const router = express.Router();
const connect = require('../connection.js')
const sha1 = require('sha1');

//getAll
router.get('/', (req, res) => {
    connect.query('select * from users', (err, data) => {
        if (err) {
            res.status(404).json(err)
            throw err
        }
        res.json(data)
    })
})

//get by id
router.get('/:email', (req, res) => {
    connect.query('select * from users where email = ?', req.params.email, (err, data) => {
        if (err) {
            res.status(404).json(err)
            throw err
        }
        res.json(data)
    })
})

//create new
router.post('/', (req, res) => {
    let user = {
        email: req.body.email,
        password: sha1(req.body.password),
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone
    }


    connect.query('insert into users set ?', user, (err, data) => {
        if (err) {
            res.status(404).json(err)
            throw err
        }
        res.json(data)
    })
})


//replace
router.put('/:email', (req, res) => {
    connect.query(`update users set ? where email = '${req.params.email}'`, req.body, (err, data) => {
        if (err) {
            res.status(404).json(err)
            throw err
        }
        res.json(data)
    })
})

//remove
router.delete('/:email', (req, res) => {
    connect.query(`delete from users where email = '${req.params.email}'`, (err, data) => {
        if (err) {
            res.status(404).json(err)
            throw err
        }
        res.json(data)
    })
})
module.exports = router



