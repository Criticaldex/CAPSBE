import dbConnect from '@/lib/dbConnect'
import Center from '@/models/centers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
   try {
      const body = await request.json();
      const fields = (body.fields) ? body.fields.join(' ') : '';
      const db = body.db;
      await dbConnect(db);
      const centros: any = await Center.findOne({}).select(fields).lean();
      return NextResponse.json(centros);
   } catch (err) {
      return NextResponse.json({ ERROR: (err as Error).message });
   }
}