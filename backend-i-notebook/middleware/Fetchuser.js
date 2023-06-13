var jwt = require('jsonwebtoken');
const JWT_SECRET = 'satyamisagoodb$boy';

const fetchuser = (req, res, next) => {
    // get the user to jwt token and add id to req object
    const token = req.header("auth-token")
    if (!token) {
        return res.status(401).send({ error: "please authaunticate to valid token1" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user
        next();
    } catch (error) {
        return res.status(401).send({ error: "please authaunticate to valid token2" })
    }

}
module.exports = fetchuser