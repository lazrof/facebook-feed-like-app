const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');

module.exports = function (req, res, next) {
    const token = req.header('Authorization');
    
    if (!token){
        return res.status(401).json(
            { message: "Authorization Token not provided." }
        );
    }

    jwt.verify(token, secrets.secretKey, function(err, decoded) {
        
        if(decoded){
            req.user = {
                id: decoded.id,
                email: decoded.email
            };

            next();
        } else {
            console.log(err);
            res.status(401).json({ message: "Security token is invalid." });
        }
    });
       
}
