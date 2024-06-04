import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { APIError } from '../utils/errors';
import { BAD_REQUEST } from '../utils/status-codes';

export const validate = (schema: Joi.ObjectSchema) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        const { error } = schema.validate(req, { abortEarly: false, allowUnknown: true });

        if (error) {
            const errorDetails = error.details.map(detail => detail.message).join(', ');
            return next(new APIError('Validation error', BAD_REQUEST, errorDetails));
        }

        next();
    };
};
