import express, { Application } from 'express';
import cors from 'cors';
import routes from './routers';
import errorHandler from './middlewares/error-handler';
import responseHandler from './middlewares/response-handler';
import rateLimit from 'express-rate-limit';

const configureApp = (app: Application): void => {
    app.use(express.json({ limit: '1mb' }));
    app.use(express.urlencoded({ extended: true, limit: '1mb' }));
    app.use(cors());
    app.use(express.static(__dirname + '/public'));

    // Rate limiting
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100 // limit each IP to 100 requests per windowMs
    });
    app.use(limiter);

    // Global response handler
    app.use(responseHandler);

    // API routes
    app.use('/api', routes);

    // Global error handler
    app.use(errorHandler);
};

// Create and configure the app
const app: Application = express();
configureApp(app);

// Export the configured app
export default app;
