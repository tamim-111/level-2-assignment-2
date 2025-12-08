import { Request, Response } from "express";
export declare const bookingsControllers: {
    createBooking: (req: Request, res: Response) => Promise<void>;
    getAllBookings: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    updateSingleBooking: (req: Request, res: Response) => Promise<void>;
};
//# sourceMappingURL=bookings.controllers.d.ts.map