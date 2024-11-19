import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "./config"

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const userMiddleware = (req: Request, res: Response, next: NextFunction):void => {
    const header = req.headers["authorization"];
    
    if (!header) {
        res.status(403).json({ message: "Authorization header missing" });
        return
    }
    
    try {
        const decoded = jwt.verify(header, JWT_SECRET) as { userTokenId: string };
        req.userId = decoded.userTokenId; // here is some problems
        next();
    } catch (error) {
        res.status(403).json({ message: "Invalid token" });
        return
    }
}

// How to override the types of the express request object

// answer is in the 02_notes.md in notes folder