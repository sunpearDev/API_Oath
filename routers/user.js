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
router.get('/:id', (req, res) => {
    connect.query('select * from users where id = ?', req.params.id, (err, data) => {
        if (err) {
            res.status(404).json(err)
            throw err
        }
        res.json(data)
    })
})

//get by name
router.get('/byname/:name', (req, res) => {
    connect.query('select * from users where name = ?', req.params.name, (err, data) => {
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
router.put('/:id', (req, res) => {
    connect.query(`update users set ? where id = '${req.params.id}'`, req.body, (err, data) => {
        if (err) {
            res.status(404).json(err)
            throw err
        }
        res.json(data)
    })
})

//remove
router.delete('/:id', (req, res) => {
    connect.query(`delete from users where email = '${req.params.id}'`, (err, data) => {
        if (err) {
            res.status(404).json(err)
            throw err
        }
        res.json(data)
    })
})
module.exports = router



