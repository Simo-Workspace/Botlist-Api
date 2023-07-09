import { verify } from "jsonwebtoken";
import { GENERICS } from "../controllers/errors.json";
import { Request, Response, NextFunction } from "express";
import { UNAUTHORIZED } from "../controllers/status-code.json";

export const auth = (req: Request, res: Response, next: NextFunction) => {
    const token: string = req.headers.authorization as string;
    const secret: string = process.env.JWT_SECRET as string;

    if (token) {
        try {
            verify(token, secret);

            next();
        } catch (error: unknown) {
            return res.status(UNAUTHORIZED).json({ message: GENERICS.INVALID_AUTH, code: UNAUTHORIZED });
        }
    }
};