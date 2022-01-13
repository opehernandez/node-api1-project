const Users = require('./model')


function validateBody(req, res, next) {
    if(!req.body.name || !req.body.bio) {
        console.log('reaching MW')
        res.status(400).json({ message: "Please provide name and bio for the user" })
    }
    else {next}
}




module.exports = {
    validateBody,
}