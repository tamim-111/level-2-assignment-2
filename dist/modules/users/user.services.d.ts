export declare const userServices: {
    getAllUserFromDB: () => Promise<import("pg").QueryResult<any>>;
    updateSingleUserFromDB: (Payload: Record<string, unknown>, id: string) => Promise<import("pg").QueryResult<any>>;
    deleteSingleUserFromDB: (id: string) => Promise<import("pg").QueryResult<any>>;
};
//# sourceMappingURL=user.services.d.ts.map