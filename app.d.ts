import { Express } from "express";
import { RateLimitRequestHandler } from "express-rate-limit";

export declare const app: Express;
export declare const limiter: RateLimitRequestHandler;