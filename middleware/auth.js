const jwt = require('jsonwebtoken')
const {UnauthenticatedError} = require('../errors')

const authenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization
    
    //check if we received the tocken from the frontend
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('No token provided')
    }

    //check the token
    const token = authHeader.split(' ')[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        //console.log(decoded)
        const {id, username} = decoded
        req.user = {id, username}
    } catch (error) {
        throw new UnauthenticatedError('Not authorized to access this route')
    }
   

    next()
}


module.exports = authenticationMiddleware