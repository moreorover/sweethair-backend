export function authenticateToken(req, res, next) {
    if (!req.session.user) {
        return res.send({
            status: 404,
            error: 'Unauthorized'
        });
    }
    next();
}
