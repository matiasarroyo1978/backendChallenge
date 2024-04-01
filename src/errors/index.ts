import { Request, Response } from 'express';

export function handleError(err: any, req: Request, res: Response) {
  console.error(err.stack);

  // Manejar errores específicos de la API
  if (err.response && err.response.status === 404) {
    res.status(404).send("Data not found");
  } else if (err.code === 'ENOTFOUND') {
    // Manejar errores de red
    res.status(500).send("Network error");
  } else {
    res.status(500).send("Error fetching data from Alpaca");
  }
}
