import LocationRepository from "../repositories/location-repository";
import { formatData } from '../utils';
import { NotFoundError } from '../utils/errors';
import axios, { AxiosResponse } from 'axios';
import cache from '../utils/cache';
import { WEATHER_API_KEY, WEATHER_API_URL } from '../config/env';

interface Location {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
}

interface Condition {
    text: string;
}

interface Hour {
    time: string;
    is_day: number;
    condition: Condition;
}

interface ForecastDay {
    date: string;
    day: {
        avgtemp_c: number;
        avgtemp_f: number;
        maxwind_mph: number;
        maxwind_kph: number;
        avghumidity: number;
        condition: Condition;
    };
    astro: {
        sunrise: string;
        sunset: string;
    };
    hour: Hour[];
}

interface WeatherResponse {
    location: Location;
    forecast: {
        forecastday: ForecastDay[];
    };
}

function mergeWeatherData(weatherDataArray: WeatherResponse[]): WeatherResponse {
    const mergedData: WeatherResponse = {
        location: weatherDataArray[0].location,
        forecast: {
            forecastday: []
        }
    };

    for (const weatherData of weatherDataArray) {
        mergedData.forecast.forecastday.push(weatherData.forecast.forecastday[0]);
    }

    return mergedData;
}

class WeatherService {
    private repository: LocationRepository;

    constructor() {
        this.repository = new LocationRepository();
    }

    async getWeatherByLocationId(options: { locationId: string, daysAhead?: string }) {
        const { locationId, daysAhead = "1" } = options;

        const location = await this.repository.getLocationById(locationId);
        if (!location) throw new NotFoundError('Location not found');

        const { latitude, longitude } = location;
        const cacheKey = `lat=${latitude},lag=${longitude},day=${daysAhead}`;

        const cachedWeather = cache.get(cacheKey);
        if (cachedWeather) return formatData(cachedWeather);

        const params = {
            q: `${latitude},${longitude}`,
            days: Number(daysAhead),
            key: WEATHER_API_KEY
        };
        const weatherResponse: AxiosResponse<WeatherResponse> = await axios.get(`${WEATHER_API_URL}/forecast.json`, { params });
        const weatherData: WeatherResponse = weatherResponse.data;

        cache.set(cacheKey, weatherData);
        return formatData(weatherData);
    }

    async getHistoricalWeather(options: { locationId: string, daysBehind: string }) {
        const { locationId, daysBehind = 7 } = options;

        const location = await this.repository.getLocationById(locationId);
        if (!location) throw new NotFoundError('Location not found');

        const { latitude, longitude } = location;
        const currentDate = new Date();
        const cacheKey = `lat=${latitude},lag=${longitude},day=${daysBehind}`;

        const cachedWeather = cache.get(cacheKey);
        if (cachedWeather) return formatData(cachedWeather);

        const promises: Promise<AxiosResponse<WeatherResponse>>[] = [];
        for (let i = 0; i < Number(daysBehind); i++) {
            const date = new Date(currentDate);
            date.setDate(date.getDate() - i);
            const dateString = date.toISOString().split('T')[0];

            const params = {
                q: `${latitude},${longitude}`,
                dt: dateString,
                key: WEATHER_API_KEY
            };
            promises.push(axios.get(`${WEATHER_API_URL}/history.json`, { params }) as Promise<AxiosResponse<WeatherResponse>>);
        }

        const weatherResponses = await Promise.all(promises);
        const mergedWeatherData = mergeWeatherData(weatherResponses.map(response => response.data));

        cache.set(cacheKey, mergedWeatherData);
        return formatData(mergedWeatherData);
    }
}

export default WeatherService;
