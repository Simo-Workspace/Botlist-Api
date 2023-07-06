import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { UNAUTHORIZED } from "../controllers/status-code.json";
import { GENERICS } from "../controllers/errors.json";

export const auth = (req: Request, res: Response, next: NextFunction) => {
    const token: string = req.headers.authorization as string;
    const secret: string = process.env.JWT_SECRET as string;
    let status: boolean = false;
    
    if(token) {
        try { 
            verify(token, secret);
            status = true;
        } catch(error:unknown) {
            status = false;
            console.error(error);
        };
    };

    if(status) {
        next();
    } else {
        return res.status(UNAUTHORIZED).json({ message: GENERICS.INVALID_AUTH, code: UNAUTHORIZED });
    };
};
