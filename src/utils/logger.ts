import { createLogger, format, transports } from 'winston';
import { LOG_LEVEL, LOG_FILE_PATH } from '../config/env';
import { Request } from 'express';

const { combine, timestamp, printf, errors } = format;

// custom log format
const logFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} [${level}]: ${stack || message}`;
});

// logger instance
const logger = createLogger({
    level: LOG_LEVEL,
    format: combine(
        timestamp(),
        errors({ stack: true }),
        logFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: LOG_FILE_PATH })
    ]
});

function logError(err: Error): void {
    logger.error(err);
}

function logRequests(req: Request): void {
    const { method, url, headers, body } = req;
    logger.info(`Request received: ${method} ${url} - Headers: ${JSON.stringify(headers)} - Body: ${JSON.stringify(body)}`);
}

export { logError, logger, logRequests };
