import { Request, Response } from "express";
export declare const vehiclesControllers: {
    createVehicle: (req: Request, res: Response) => Promise<void>;
    getAllVehicle: (req: Request, res: Response) => Promise<void>;
    getSingleVehicle: (req: Request, res: Response) => Promise<void>;
    updateSingleVehicle: (req: Request, res: Response) => Promise<void>;
    deleteSingleVehicle: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
};
//# sourceMappingURL=vehicles.controllers.d.ts.map