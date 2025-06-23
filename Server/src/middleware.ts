import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_PASSWORD } from "./config";
import dotenv from "dotenv";

dotenv.config();

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"];
    if (!header) {
        res.status(403).json({
            message: "You are not logged in"
        });
        return;
    }
    let decoded: JwtPayload | string;
    try {
        if (!JWT_PASSWORD) {
            res.status(500).json({
                message: "JWT secret is not configured"
            });
            return;
        }
        decoded = jwt.verify(header, JWT_PASSWORD) as JwtPayload | string;
    } catch (err) {
        res.status(403).json({
            message: "Invalid or expired token"
        });
        return;
    }
    if (typeof decoded === "string") {
        res.status(403).json({
            message: "You are not logged in"
        });
        return;    
    }
    req.userId = (decoded as JwtPayload).id;
    next();
}