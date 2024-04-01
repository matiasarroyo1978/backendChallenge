import { Request, Response } from 'express';
import { getAveragePrice as calculateAveragePrice } from '../services/averagePriceService';
import { handleError } from '../errors';

export const getAveragePrice = async (req: Request, res: Response) => {
  try {
    const volume = Number(req.query.volume);
    const symbols = req.query.symbols as string;

    if (!volume || !symbols) {
      return res.status(400).send("Volume and symbols parameters are required");
    }
    const averagePrice = await calculateAveragePrice(volume, symbols);

    res.send({ averagePrice });
  } catch (err) {
    if ((err as Error).message.startsWith('No data available for symbol')) {
      res.status(400).send((err as Error).message);
    } else {
      handleError(err, req, res);
    }
  }
};

