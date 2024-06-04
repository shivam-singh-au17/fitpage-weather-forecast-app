import Joi from 'joi';

export const getWeatherByLocationIdSchema = Joi.object({
    params: Joi.object({
        locationId: Joi.string().required(),
    }),
    query: Joi.object({
        daysAhead: Joi.number().min(1).max(14).optional(),
    })
});

export const getHistoricalWeatherSchema = Joi.object({
    query: Joi.object({
        locationId: Joi.string().required(),
        daysBehind: Joi.string().required().valid('7', '15', '30'),
    })
});
