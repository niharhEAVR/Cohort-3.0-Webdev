// types.d.ts
import 'express';

declare module 'express' {
    export interface Request {
        userId?: string; // Add custom properties here
    }
}
