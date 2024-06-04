import express, { Router } from 'express';
import locationRoutes from './location-router';

const router: Router = express.Router();

router.use('/locations', locationRoutes);

export default router;
