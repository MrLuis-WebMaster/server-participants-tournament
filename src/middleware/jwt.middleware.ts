import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

export function JwtMiddleware(req: Request, res: Response, next: NextFunction) {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({ message: 'No Authorization header found' });
  }

  const parts = authorizationHeader.split(' ');

  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res
      .status(401)
      .json({ message: 'Invalid Authorization header format' });
  }

  const tokenFromHeader = parts[1];

  try {
    jwt.verify(tokenFromHeader, process.env.JWTKEY);
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
