const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
    try {
    const token = req.body.token || req.query.token || req.headers.authorization;
    const authToken = token.split(" ")[1];
    if (!token) {
        return res.status(404).send({
            success: false,
            message: "Token is required"
        });
    }
        const decodedToken = jwt.verify(authToken, process.env.JWT_TOKEN);
        req.user = decodedToken;
        next();

    } catch (err) {
        res.status(500).send({
            success: false,
            message: err.message
        });
    }
}

module.exports = auth;
