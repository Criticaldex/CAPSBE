import { log } from 'console';
import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  message: string;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { model } = req.body;
  let { fields, filter } = req.body;

  if (req.method === 'POST' && model) {
    try {
      fields = (fields) ? fields.join(' ') : '';

      const db = await mongoose.createConnection(`${process.env.MONGO_HOST}/CAPFA`,
        {
          authSource: process.env.MONGO_AUTH,
          user: process.env.MONGO_USER,
          pass: process.env.MONGO_PASS
        });
      const schema = mongoose.Schema;
      const data = await db.model(
        model,
        new schema()
      ).find(filter).select(fields).exec();
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json({ ERROR: (err as Error).message });
    }
  } else {
    res.status(500).send({ ERROR: 'Utiliza una peticion POST para consultar este endpoint!' });
  }
}