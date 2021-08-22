const jwt = require('jsonwebtoken');
require('dotenv').config();

export function validateUserRoleToAdmin(req, res, next) {
    const jwt_access_token = req.cookies.jwt;
    const data = jwt.verify(jwt_access_token, process.env.JWT_ACCESS_TOKEN);

    if (data.role.name === 'Admin') {
        next();
    } else {
        return res.send({
            status: 404,
            error: 'Unauthorized'
        });
    }
}
