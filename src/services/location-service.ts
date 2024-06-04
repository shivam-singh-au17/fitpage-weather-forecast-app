import LocationRepository from "../repositories/location-repository";
import { formatData } from '../utils';
import { NotFoundError } from '../utils/errors';
import { ILocation } from "../models";

class LocationService {
    private repository: LocationRepository;

    constructor() {
        this.repository = new LocationRepository();
    }

    async createLocation(locationInputs: Partial<ILocation>) {
        const location = await this.repository.createLocation(locationInputs);
        return formatData(location);
    }

    async getLocation(locationId: string) {
        const location = await this.repository.getLocationById(locationId);
        if (!location) throw new NotFoundError('Location not found');
        return formatData(location);
    }

    async updateLocation(locationId: string, location: Partial<ILocation>) {
        const updatedLocation = await this.repository.updateLocation(locationId, location);
        if (!updatedLocation) throw new NotFoundError('Location not found');
        return formatData(updatedLocation);
    }

    async deleteLocation(locationId: string) {
        const deletedLocation = await this.repository.deleteLocation(locationId);
        if (!deletedLocation) throw new NotFoundError('Location not found');
        return formatData({ message: "Location deleted successfully" });
    }

    async getAllLocations(options: { page: number, limit: number, sortBy: string, sortOrder: string, search: string }) {
        const locations = await this.repository.getAllLocations(options);
        return formatData(locations);
    }

}

export default LocationService;
