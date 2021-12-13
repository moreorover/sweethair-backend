import { Request, Response, NextFunction } from 'express';

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.session.user) {
    return res.sendStatus(401);
  }
  next();
}
