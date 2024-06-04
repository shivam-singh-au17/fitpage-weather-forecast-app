import { LocationModel, ILocation } from "../models";
import { APIError } from "../utils/errors";
import { INTERNAL_ERROR } from "../utils/status-codes";
import { Error as MongooseError, PipelineStage } from 'mongoose';

class LocationRepository {
    async createLocation(payload: Partial<ILocation>): Promise<ILocation> {
        try {
            const location = new LocationModel(payload);
            return await location.save();
        } catch (err) {
            const mongooseErr = err as MongooseError;
            throw new APIError("Unable to create location", INTERNAL_ERROR, mongooseErr.message);
        }
    }

    async getLocationById(id: string): Promise<ILocation | null> {
        try {
            return await LocationModel.findById(id);
        } catch (err) {
            const mongooseErr = err as MongooseError;
            throw new APIError("Unable to find location", INTERNAL_ERROR, mongooseErr.message);
        }
    }

    async updateLocation(id: string, location: Partial<ILocation>): Promise<ILocation | null> {
        try {
            return await LocationModel.findByIdAndUpdate(id, location, { new: true });
        } catch (err) {
            const mongooseErr = err as MongooseError;
            throw new APIError("Unable to update location", INTERNAL_ERROR, mongooseErr.message);
        }
    }

    async deleteLocation(id: string): Promise<ILocation | null> {
        try {
            return await LocationModel.findByIdAndDelete(id);
        } catch (err) {
            const mongooseErr = err as MongooseError;
            throw new APIError("Unable to delete location", INTERNAL_ERROR, mongooseErr.message);
        }
    }

    async getAllLocations(options: { page: number, limit: number, sortBy: string, sortOrder: string, search: string }): Promise<{ data: ILocation[], count: number }> {
        try {
            const { page, limit, sortBy, sortOrder, search } = options;
            const skip = (page - 1) * limit;

            const matchStage = search ? {
                $match: {
                    $or: [
                        { name: { $regex: search, $options: 'i' } }
                    ]
                }
            } : {
                $match: {}
            };

            const projectStage = {
                $project: {
                    _id: 1,
                    name: 1,
                    latitude: 1,
                    longitude: 1,
                    createdAt: 1,
                    updatedAt: 1
                }
            };

            const pipeline: PipelineStage[] = [
                matchStage,
                {
                    $sort: {
                        [sortBy]: (sortOrder === "ASC" ? 1 : -1)
                    }
                },
                projectStage,
                {
                    $facet: {
                        locations: [
                            { $skip: skip },
                            { $limit: limit }
                        ],
                        count: [
                            {
                                $count: 'count'
                            }
                        ]
                    }
                }
            ];

            const [result] = await LocationModel.aggregate(pipeline);

            const count = result.count.length > 0 ? result.count[0].count : 0;
            const data = result.locations;

            return { data, count };
        } catch (err) {
            const mongooseErr = err as MongooseError;
            throw new APIError("Unable to get locations", INTERNAL_ERROR, mongooseErr.message);
        }
    }
}

export default LocationRepository;
