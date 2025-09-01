import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const signToken = (payload: object) => (
    //@ts-ignore
  jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
);

export const verifyToken = (token: string) => (
    //@ts-ignore
    jwt.verify(token, JWT_SECRET)
);