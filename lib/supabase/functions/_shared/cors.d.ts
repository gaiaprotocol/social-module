export declare const corsHeaders: {
    "Access-Control-Allow-Origin": string;
    "Access-Control-Allow-Headers": string;
    "Access-Control-Allow-Methods": string;
};
export declare const response: (data: string | object) => Response;
export declare const serveWithOptions: (handler: (req: Request) => Promise<Response | void>) => void;
//# sourceMappingURL=cors.d.ts.map