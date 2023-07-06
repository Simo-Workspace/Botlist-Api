import { Request, Response } from "express";

export const getToken = (req: Request, res: Response) => {
    return res.json({ token: req.cookies.discordUser as string });
};