import mongoose from 'mongoose'
import dbConnect from '@/lib/dbConnect'
import InversioSchema from '@/schemas/inversio'
import { NextResponse } from "next/server";

export async function POST(request: Request) {
   try {
      const body = await request.json();
      const fields = (body.fields) ? body.fields.join(' ') : '';
      const dbName = body.db;
      await dbConnect();
      const db = mongoose.connection.useDb(dbName, { useCache: true });
      if (!db.models.inversion) {
         db.model('inversion', InversioSchema);
      }
      const inversio: any = await db.models.inversion.find(body.filter).select(fields).sort(body.sort).lean();
      return NextResponse.json(inversio);
   } catch (err) {
      return NextResponse.json({ ERROR: (err as Error).message });
   }
}