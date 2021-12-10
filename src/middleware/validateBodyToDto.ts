import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export function validateDto(schema) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const bodyToClass = plainToClass(schema, req.body);
        validateOrReject(bodyToClass)
            .then(() => {
                next();
            })
            .catch((errors) => {
                console.log(errors);
                res.send({
                    status: 404,
                    error: 'Invalid data provided!'
                });
            });
    };
}
