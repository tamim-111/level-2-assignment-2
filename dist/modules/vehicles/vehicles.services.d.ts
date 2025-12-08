export declare const vehiclesServices: {
    sendVehicleIntoDB: (Payload: Record<string, unknown>) => Promise<import("pg").QueryResult<any>>;
    getAllVehiclesFromDB: () => Promise<import("pg").QueryResult<any>>;
    getSingleVehiclesFromDB: (vehicleId: string) => Promise<import("pg").QueryResult<any>>;
    updateSingleVehiclesFromDB: (Payload: Record<string, unknown>, vehicleId: string) => Promise<import("pg").QueryResult<any>>;
    updateSingleVehiclesStatusFromDB: (availability_status: string, vehicleId: string) => Promise<import("pg").QueryResult<any>>;
    deleteSingleVehiclesFromDB: (vehicleId: string) => Promise<import("pg").QueryResult<any>>;
};
//# sourceMappingURL=vehicles.services.d.ts.map