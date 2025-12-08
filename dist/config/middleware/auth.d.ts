import { NextFunction, Request, Response } from "express";
declare const authMiddleware: (...allowedRoles: string[]) => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export default authMiddleware;
//# sourceMappingURL=auth.d.ts.map