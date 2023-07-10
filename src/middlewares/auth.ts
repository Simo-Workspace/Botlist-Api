import { verify } from "jsonwebtoken";
import { GENERICS } from "../routers/helpers/errors.json";
import { SyncExpressResponse } from "../core/types/types";
import { Request, Response, NextFunction } from "express";
import { UNAUTHORIZED } from "../routers/helpers/status-code.json";

export const auth: (req: Request, res: Response, next: NextFunction) => SyncExpressResponse | void = (req: Request, res: Response, next: NextFunction): SyncExpressResponse | void => {
    const token: string = req.headers.authorization as string;
    const secret: string = process.env.JWT_SECRET as string;

    if (token) {
        try {
            verify(token, secret);

            next();
        } catch {
            return res.status(UNAUTHORIZED).json({ message: GENERICS.INVALID_AUTH, code: UNAUTHORIZED });
        }
    }
};