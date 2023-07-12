import dbConnect from '@/lib/dbConnect'
import Contract from '@/models/contract'
import { NextResponse } from 'next/server'
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
   try {
      const body = await request.json()
      const fields = (body.fields) ? body.fields.join(' ') : '';
      const db = body.db;
      await dbConnect(db);
      const contract: any = await Contract.find(body.filter).select(fields).lean();
      return NextResponse.json(contract);
   } catch (err) {
      return NextResponse.json({ ERROR: (err as Error).message });
   }
}