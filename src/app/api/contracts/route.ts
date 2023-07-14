import mongoose from 'mongoose'
import dbConnect from '@/lib/dbConnect'
import contractSchema from '@/schemas/contract'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
   try {
      const body = await request.json()
      const fields = (body.fields) ? body.fields.join(' ') : '';
      const dbName = body.db;
      await dbConnect();
      const db = mongoose.connection.useDb(dbName, { useCache: true });
      if (!db.models.contract) {
         db.model('contract', contractSchema);
      }
      const contract: any = await db.models.contract.find(body.filter).select(fields).lean();
      return NextResponse.json(contract);
   } catch (err) {
      return NextResponse.json({ ERROR: (err as Error).message });
   }
}