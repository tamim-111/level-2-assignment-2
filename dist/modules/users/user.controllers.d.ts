import { Request, Response } from "express";
export declare const userControllers: {
    getAllUser: (req: Request, res: Response) => Promise<void>;
    updateSingleUser: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    deleteSingleUser: (req: Request, res: Response) => Promise<void>;
};
//# sourceMappingURL=user.controllers.d.ts.map