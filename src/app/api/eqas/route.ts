import dbConnect from '@/lib/dbConnect'
import Eqa from '@/models/eqa'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
   try {
      const body = await request.json()
      const fields = (body.fields) ? body.fields.join(' ') : '';
      await dbConnect(process.env.MONGO_DB);
      const eqas: any = await Eqa.find(body.filter).select(fields).lean();
      return NextResponse.json(eqas);
   } catch (err) {
      return NextResponse.json({ ERROR: (err as Error).message });
   }
}