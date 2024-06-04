import { Request, Response, NextFunction } from 'express';
import { APIError } from '../utils/errors';
import { INTERNAL_ERROR } from '../utils/status-codes';
import { logError } from '../utils/logger';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): Response => {
    logError(err);

    if (err instanceof APIError) {
        return res.status(err.statusCode).json({
            status: false,
            message: err.message,
            details: err.details
        });
    }

    return res.status(INTERNAL_ERROR).json({
        status: false,
        message: 'An unexpected error occurred',
        details: err.message
    });
};

export default errorHandler;
