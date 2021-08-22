import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';

function validateDto(schema) {
    return async (req, res, next) => {
        const bodyToClass = plainToClass(schema, req.body);
        validateOrReject(bodyToClass)
            .then(() => {
                next();
            })
            .catch((errors) => {
                res.send({
                    status: 404,
                    error: 'Invalid data provided!'
                });
            });
    };
}

module.exports = { validateDto };
