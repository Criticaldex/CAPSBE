import { log } from 'console';
import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const db = await mongoose.createConnection('mongodb://trial.soidemdt.com:27017/CAPFA',
      {
        authSource: 'admin',
        user: 'Admin',
        pass: 'DTSoidem.918'
      });

    const schema = mongoose.Schema;
    const contractes2022 = await db.model(
      'contract',
      new schema(
        {
          Indicador: String,
          Resultat: [String]
        }
      )
    ).find().select('Indicador Resultat -_id');
    res.status(200).json({ contractes2022 });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}