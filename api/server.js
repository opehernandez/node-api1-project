// BUILD YOUR SERVER HERE
const express = require('express')
const Users = require('./users/model')
const server = express()
const { validateBody, checkId } = require('./users/middleware')
const { json } = require('express/lib/response')
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
                throw new Error('does not exist')
            }
            else {
                res.status(200).json(user)
            }
        })
        .catch(err => {
            res.status(404).json({message: err.message})
        })
})

server.post('/api/users', validateBody, (req, res, next) => {
    Users.insert(req.body)
        .then(userToCreate => {
            res.status(201).json(userToCreate)
        })
        .catch(err => {
            res.status(500).json({message: err.message})
        })
})

server.delete('/api/users/:id', checkId, (req, res, next) => {
    Users.remove(req.params.id)
        .then(userToDelete => {
            console.log(userToDelete)
            res.status(200).json(userToDelete)
        })
        .catch(err => {
            res.status(500).json({message: err.message})
        })
})

server.put('/api/users/:id', validateBody, checkId, (req, res, next) => {
    Users.update(req.params.id, req.body)
        .then(userUpdated => {
            res.status(200).json(userUpdated)
        })
        .catch(err => {
            json.status(500).json({message: err.message})
        })
})


module.exports = server
