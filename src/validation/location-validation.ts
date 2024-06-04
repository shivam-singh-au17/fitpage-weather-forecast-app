import Joi from 'joi';

export const createLocationSchema = Joi.object({
    body: Joi.object({
        name: Joi.string().required(),
        latitude: Joi.number().min(-90).max(90).required(),
        longitude: Joi.number().min(-180).max(180).required(),
    })
});

export const updateLocationSchema = Joi.object({
    params: Joi.object({
        locationId: Joi.string().required(),
    }),
    body: Joi.object({
        name: Joi.string().optional(),
        latitude: Joi.number().min(-90).max(90).optional(),
        longitude: Joi.number().min(-180).max(180).optional(),
    })
});

export const getLocationIdSchema = Joi.object({
    params: Joi.object({
        locationId: Joi.string().required(),
    })
});

export const getAllLocationsSchema = Joi.object({
    query: Joi.object({
        page: Joi.number().optional(),
        limit: Joi.number().optional(),
        sortBy: Joi.string().optional(),
        sortOrder: Joi.string().valid('ASC', 'DESC').optional(),
        search: Joi.string().optional(),
    })
});
