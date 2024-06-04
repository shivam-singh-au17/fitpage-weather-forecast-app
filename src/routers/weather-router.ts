import express from 'express';
import {
    getWeatherByLocationId,
    getHistoricalWeather
} from '../controllers/weather-controller';
import { validate } from '../middlewares/validate';
import {
    getWeatherByLocationIdSchema,
    getHistoricalWeatherSchema
} from '../validation/weather-validation';

const router = express.Router();

router.get('/history', validate(getHistoricalWeatherSchema), getHistoricalWeather);
router.get('/:locationId', validate(getWeatherByLocationIdSchema), getWeatherByLocationId);

export default router;
