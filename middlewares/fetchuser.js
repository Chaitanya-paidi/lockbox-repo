var jwt = require('jsonwebtoken')
require('dotenv').config()

const JWT_SECRET = process.env.SECRET_KEY

const fetchuser = (req, res, next) =>{
    //Get user from the jwt token and add id to req object
    const token = req.header('auth-token')
    if(!token){
        res.status(401).send({error: "Please authenticate using a valid token"})
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({error: "Please authenticate using a valid token"})
    }

}

module.exports = fetchuser

