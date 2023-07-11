import dbConnect from '@/lib/dbConnect'
import Center from '@/models/centers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
   try {
      const body = await request.json();
      const fields = (body.fields) ? body.fields.join(' ') : '';
      await dbConnect(process.env.MONGO_DB);
      const centros: any = await Center.findOne({}).select(fields).lean();
      return NextResponse.json(centros);
   } catch (err) {
      return NextResponse.json({ ERROR: (err as Error).message });
   }
}