import { log } from 'console';
import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  message: string;
};

export default async function handler( req: NextApiRequest, res: NextApiResponse) {
  const { model } = req.body;
  let { fields, filter } = req.body;
  if (req.method === 'POST' && model) {
  try {
    fields = (fields) ? fields.join(' ') : '';
    const db = await mongoose.createConnection('mongodb://trial.soidemdt.com:27017/CAPFA',
      {
        authSource: 'admin',
        user: 'Admin',
        pass: 'DTSoidem.918'
      });

    const schema = mongoose.Schema;
    const contractes2022 = await db.model(
      model,
      new schema(
        {
          Indicador: String,
          Resultat: [String]
        }
      )
    ).find().select(fields);
    res.status(200).json({ contractes2022 });
  } catch (err) {
    res.status(500).json({ ERROR: (err as Error).message });
  }
} else {
  res.status(500).send({ ERROR: 'Utiliza una peticion POST para consultar este endpoint!'});
  }
}