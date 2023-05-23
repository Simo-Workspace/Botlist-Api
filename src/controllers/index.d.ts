import { Request, Response } from "express";
import { ExpressPromise } from "../typings";

declare const deleteBot = async (req: Request, res: Response) => ExpressPromise;
declare const getBot = async (req: Request, res: Response) => ExpressPromise;
declare const editBot = async (req: Request, res: Response) => ExpressPromise;
declare const addBot = async (req: Request, res: Response) => ExpressPromise;