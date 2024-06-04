import { Request, Response, NextFunction } from 'express';
import WeatherService from "../services/weather-service";
import asyncHandler from "../utils/async-handler";
import { logRequests } from '../utils/logger';

const service = new WeatherService();

export const getWeatherByLocationId = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    logRequests(req);

    const { locationId } = req.params;
    const { daysAhead } = req.query as { daysAhead: string };
    const { data } = await service.getWeatherByLocationId({ locationId, daysAhead });
    return res.json(data);
});

export const getHistoricalWeather = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    logRequests(req);
    
    const { locationId, daysBehind } = req.query as { locationId: string, daysBehind: string };
    const { data } = await service.getHistoricalWeather({ locationId, daysBehind });
    return res.json(data);
});

