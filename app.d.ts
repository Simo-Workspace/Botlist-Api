import { Express } from "express";
import { RateLimitRequestHandler } from "express-rate-limit";

declare const app: Express;
declare const limiter: RateLimitRequestHandler;

export default app;