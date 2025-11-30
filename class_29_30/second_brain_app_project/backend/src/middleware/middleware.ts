import { type NextFunction, type Request, type Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import { JWT_SECRET } from "../assets/config"

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

interface TokenPayload extends JwtPayload {
    userId: string;
}

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(403).json({ message: "Authorization header missing or invalid" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) throw new Error("Invalid token"); // this is very important because stops the undefined | null error for token in ts.

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as TokenPayload;
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid token" });
    }
}
