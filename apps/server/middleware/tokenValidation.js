const jwt = require("jsonwebtoken");

module.exports.validateToken = (req, res, next) => {
    let response = {};

    try {
        if (!req.headers.authorization) {
            throw new Error("Token is missing from header");
        }

        const userToken = req.headers.authorization.split("Bearer")[1].trim();
        const decodedToken = jwt.verify(userToken, process.env.SECRET_KEY || "default-secret-key");
        if (!decodedToken) {
            return new Error("Error in token validation");
        }
        return next();
    } catch (error) {
        console.error(error);
        response.status = 401;
        response.message = error.message;
    }

    return res.status(response.status).send(response);
};
