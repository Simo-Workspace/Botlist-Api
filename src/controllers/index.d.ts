import { Request, Response } from "express";
import { ExpressPromise } from "../typings";

declare const deleteBot: (req: Request, res: Response) => ExpressPromise = async (req: Request, res: Response) => ExpressPromise;
declare const getBot: (req: Request, res: Response) => ExpressPromise = async (req: Request, res: Response) => ExpressPromise;
declare const editBot: (req: Request, res: Response) => ExpressPromise = async (req: Request, res: Response) => ExpressPromise;
declare const addBot: (req: Request, res: Response) => ExpressPromise = async (req: Request, res: Response) => ExpressPromise;