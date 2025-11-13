// ./middleware.ts

import { NextFunction, Request ,Response} from "express";
import { JWT_PASSWORD } from "./config";
import jwt from "jsonwebtoken";

export const middleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({
            message: "Missing or invalid authorization header"
        });
    }

    const token = authHeader.split(' ')[1]; 
    
    try {
        
        const decoded: any = jwt.verify(token, JWT_PASSWORD); 
        
        //@ts-ignore
        req.userId = decoded.userId; // <-- Use decoded.userId
        
        next();
    } catch (e) {
        
        return res.status(403).json({
            message: "Invalid token"
        });
    }
}