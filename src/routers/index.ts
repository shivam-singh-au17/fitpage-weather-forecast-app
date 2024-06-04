import express, { Router } from 'express';
import locationRoutes from './location-router';
import weatherRoutes from './weather-router';

const router: Router = express.Router();

router.use('/locations', locationRoutes);
router.use('/weathers', weatherRoutes);

export default router;
