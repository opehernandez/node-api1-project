// BUILD YOUR SERVER HERE
const express = require('express')
const Users = require('./users/model')
const server = express()
const { validateBody } = require('./users/middleware')
server.use(express.json())


server.get('/api/users', (req, res, next) => {
    Users.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({message: err.message})
        })
})

server.get('/api/users/:id', (req, res, next) => {
    Users.findById(req.params.id)
        .then(user => {
            if(!user) {
                throw new Error('user not found')
            }
            else {
                res.status(200).json(user)
            }
        })
        .catch(err => {
            res.status(404).json({message: err.message})
        })
})

server.post('/api/users', (req, res, next) => {
    Users.insert(req.body)
        .then(userToCreate => {
            res.status(201).json(userToCreate)
        })
        .catch(err => {
            res.status(500).json({message: err.message})
        })
})



module.exports = server
