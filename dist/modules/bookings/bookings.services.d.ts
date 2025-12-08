export declare const bookingsServices: {
    sendBookingIntoDB: (Payload: Record<string, unknown>) => Promise<import("pg").QueryResult<any>>;
    getAllBookingsFromDB: () => Promise<import("pg").QueryResult<any>>;
    getSingleBookingsFromDB: (customer_id: string) => Promise<import("pg").QueryResult<any>>;
    getActiveBookingsByVehicleId: (vehicleId: string) => Promise<import("pg").QueryResult<any>>;
    updateSingleBookingFromDB: (bookingId: string, newStatus: string, user: any) => Promise<import("pg").QueryResult<any>>;
};
//# sourceMappingURL=bookings.services.d.ts.map