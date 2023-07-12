import dbConnect from '@/lib/dbConnect'
import Eqa from '@/models/eqa'
import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
   try {
      const body = await request.json()
      const fields = (body.fields) ? body.fields.join(' ') : '';
      const db = body.db;
      await dbConnect(db);
      const eqas: any = await Eqa.find(body.filter).select(fields).lean();
      return NextResponse.json(eqas);
   } catch (err) {
      return NextResponse.json({ ERROR: (err as Error).message });
   }
}