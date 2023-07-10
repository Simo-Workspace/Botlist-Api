import { Request, Response } from "express";
import { SyncExpressResponse } from "../../types/types";

export const getToken: (req: Request, res: Response) => SyncExpressResponse = (req: Request, res: Response): SyncExpressResponse => {
    return res.json({ token: req.cookies.discordUser as string });
};