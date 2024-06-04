import express from 'express';
import {
    createLocation,
    updateLocation,
    getAllLocations,
    getLocation,
    deleteLocation,
} from '../controllers/location-controller';
import { validate } from '../middlewares/validate';
import {
    createLocationSchema,
    updateLocationSchema,
    getAllLocationsSchema,
    getLocationIdSchema,
} from '../validation/location-validation';

const router = express.Router();

router.post('/', validate(createLocationSchema), createLocation);

router.put('/:locationId', validate(updateLocationSchema), updateLocation);

router.get('/', validate(getAllLocationsSchema), getAllLocations);
router.get('/:locationId', validate(getLocationIdSchema), getLocation);

router.delete('/:locationId', validate(getLocationIdSchema), deleteLocation);

export default router;
