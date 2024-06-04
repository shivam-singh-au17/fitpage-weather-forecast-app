import { NOT_FOUND, BAD_REQUEST } from './status-codes';

class APIError extends Error {
    statusCode: number;
    details?: string;

    constructor(message: string, statusCode: number, details?: string) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
    }
}

class NotFoundError extends APIError {
    constructor(message: string = 'Resource not found', details?: string) {
        super(message, NOT_FOUND, details);
    }
}

class ValidationError extends APIError {
    constructor(message: string = 'Validation failed', details?: string) {
        super(message, BAD_REQUEST, details);
    }
}

export { APIError, NotFoundError, ValidationError };
