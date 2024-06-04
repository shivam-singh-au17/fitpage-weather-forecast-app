import { Request, Response, NextFunction } from 'express';
import LocationService from "../services/location-service";
import asyncHandler from "../utils/async-handler";

const service = new LocationService();

export const createLocation = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { name, latitude, longitude } = req.body;
    const { data } = await service.createLocation({ name, latitude, longitude });
    return res.json(data);
});

export const getLocation = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { locationId } = req.params;
    const { data } = await service.getLocation(locationId);
    return res.json(data);
});

export const updateLocation = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { locationId } = req.params;
    const { name, latitude, longitude } = req.body;
    const { data } = await service.updateLocation(locationId, { name, latitude, longitude });
    return res.json(data);
});

export const deleteLocation = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { locationId } = req.params;
    const { data } = await service.deleteLocation(locationId);
    return res.json(data);
});

export const getAllLocations = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { page, limit, sortBy, sortOrder, search } = req.query;
    const paginationOptions = {
        page: Number(page) || 1,
        limit: Number(limit) || 10,
        sortBy: sortBy as string || "createdAt",
        sortOrder: sortOrder as string || "DESC",
        search: search as string || ""
    };
    const { data } = await service.getAllLocations(paginationOptions);
    return res.json(data);
});
