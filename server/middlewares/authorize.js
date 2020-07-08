const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');

module.exports = function (req, res, next) {
    const authToken = req.header('Authorization');
    
    if (!authToken){
        return res.status(401).json(
            { message: "Authorization Token not provided." }
        );
    }

    jwt.verify(authToken, secrets.secretKey, function(err, decoded) {
        
        if(decoded){
            req.user = {
                id: tokenData.id,
                email: tokenData.email
            };

            next();
        } else {
            console.log(err);
            res.status(401).json({ message: "Security token invalid" });
        }
    });
       
}
