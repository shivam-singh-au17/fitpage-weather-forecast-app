import dotenv from 'dotenv';
import path from 'path';

type EnvVars = {
    PORT: string;
    MONGODB_URI: string;
    LOG_FILE_PATH: string;
    LOG_LEVEL: string;
    WEATHER_API_KEY: string;
    WEATHER_API_URL: string;
    CACHE_TTL: string;
};

// Load .env.development in development, .env in production
const envFile: string = process.env.NODE_ENV !== 'production' ? '.env.development' : '.env';
dotenv.config({ path: path.join(__dirname, '../../', envFile) });

function loadEnvVars(): EnvVars {
    const requiredVars: (keyof EnvVars)[] = ['MONGODB_URI', 'WEATHER_API_KEY', 'WEATHER_API_URL'];
    const envVars: Partial<EnvVars> = {};

    requiredVars.forEach(varName => {
        const value = process.env[varName];
        if (!value) {
            throw new Error(`${varName} is not defined in the environment variables.`);
        }
        envVars[varName] = value;
    });

    return envVars as EnvVars;
}

const config = loadEnvVars();

export const {
    PORT = 3030,
    MONGODB_URI,
    WEATHER_API_KEY,
    WEATHER_API_URL,
    CACHE_TTL = (60 * 30),
    LOG_FILE_PATH = 'logs/app_error.log',
    LOG_LEVEL = 'info'
} = config;
