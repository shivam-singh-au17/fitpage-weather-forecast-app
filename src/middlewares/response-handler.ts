import { Request, Response, NextFunction } from 'express';

const responseHandler = (req: Request, res: Response, next: NextFunction): void => {
    // Save the original res.json function
    const originalJson = res.json;

    // Override res.json
    res.json = function (this: Response, data: any): Response {
        if (data.status === false) {
            return originalJson.call(this, data);
        } else {
            return originalJson.call(this, { status: true, data });
        }
    };

    next();
};

export default responseHandler;
