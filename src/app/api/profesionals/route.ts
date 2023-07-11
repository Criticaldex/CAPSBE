import dbConnect from '@/lib/dbConnect'
import Profesional from '@/models/profesional'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
   try {
      const body = await request.json()
      const fields = (body.fields) ? body.fields.join(' ') : '';
      await dbConnect(process.env.MONGO_DB);
      const profesional: any = await Profesional.find(body.filter).select(fields).lean();
      return NextResponse.json(profesional);
   } catch (err) {
      return NextResponse.json({ ERROR: (err as Error).message });
   }
}