const Users = require('./model')


function validateBody(req, res, next) {
    if(!req.body.name || !req.body.bio) {
        res.status(400).json({ message: "Please provide name and bio for the user" })
    }
    else {next()}
}

function checkId(req, res, next) {
    Users.findById(req.params.id)
        .then(user => {
            if(!user) {
                console.log(user)
                res.status(404).json({message: 'does not exist'})
            }
            else {
                next()
            }
        })
        .catch(err => {
            res.status(500).json({message: err.message})
        })
}




module.exports = {
    validateBody,
    checkId
}