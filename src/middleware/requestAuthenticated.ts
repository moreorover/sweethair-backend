const jwt = require('jsonwebtoken');
require('dotenv').config();

export function authenticateToken(req, res, next) {
    const jwt_access_token = req.cookies.jwt;

    if (!jwt_access_token) {
        return res.send({
            status: 404,
            error: 'Unauthorized'
        });
    }
    try {
        const data = jwt.verify(jwt_access_token, process.env.JWT_ACCESS_TOKEN);
        req.user = data;
        next();
    } catch {
        return res.send({
            status: 404,
            error: 'Unauthorized'
        });
    }
}
