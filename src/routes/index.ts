import express from 'express';
import { getAveragePrice } from '../controllers/averagePriceController';

const router = express.Router();

router.get('/average-price', getAveragePrice);

export default router;
