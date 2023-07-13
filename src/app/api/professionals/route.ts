import dbConnect from '@/lib/dbConnect'
import Professional from '@/models/professional'
import { NextResponse } from "next/server";

export async function POST(request: Request) {
   try {
      const body = await request.json()
      const fields = (body.fields) ? body.fields.join(' ') : '';
      const db = body.db;
      await dbConnect(db);
      const professional: any = await Professional.find(body.filter).select(fields).lean();
      return NextResponse.json(professional);
   } catch (err) {
      return NextResponse.json({ ERROR: (err as Error).message });
   }
}