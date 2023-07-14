import mongoose from 'mongoose'
import dbConnect from '@/lib/dbConnect'
import professionalSchema from '@/schemas/professional'
import { NextResponse } from "next/server"

export async function POST(request: Request) {
   try {
      const body = await request.json()
      const fields = (body.fields) ? body.fields.join(' ') : '';
      const dbName = body.db;
      await dbConnect();
      const db = mongoose.connection.useDb(dbName, { useCache: true });
      if (!db.models.professional) {
         db.model('professional', professionalSchema);
      }
      const professional: any = await db.models.professional.find(body.filter).select(fields).lean();
      return NextResponse.json(professional);
   } catch (err) {
      return NextResponse.json({ ERROR: (err as Error).message });
   }
}