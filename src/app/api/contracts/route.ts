import dbConnect from '@/lib/dbConnect'
import Contract from '@/models/contract'
import { NextResponse } from 'next/server'


export async function POST(request: Request) {
   try {
      const body = await request.json()
      const fields = (body.fields) ? body.fields.join(' ') : '';
      await dbConnect(process.env.MONGO_DB);
      const contract: any = await Contract.find(body.filter).select(fields).lean();
      return NextResponse.json(contract);
   } catch (err) {
      return NextResponse.json({ ERROR: (err as Error).message });
   }
}