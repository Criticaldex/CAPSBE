import mongoose from 'mongoose'
import dbConnect from '@/lib/dbConnect'
import IQFSchema from '@/schemas/iqf'
import { NextResponse } from "next/server";
import { hash } from 'bcryptjs';

export async function POST(request: Request) {
   try {
      const body = await request.json();
      const fields = (body.fields) ? body.fields.join(' ') : '';
      const dbName = 'IQF';
      await dbConnect();
      const db = mongoose.connection.useDb(dbName, { useCache: true });
      if (!db.models.iqf) {
         db.model('iqf', IQFSchema);
      }
      const iqf: any = await db.models.iqf.find(body.filter).select(fields).lean();
      return NextResponse.json(iqf);
   } catch (err) {
      return NextResponse.json({ ERROR: (err as Error).message });
   }
}

export async function GET(request: Request) {
   try {
      return NextResponse.json(null);
   } catch (err) {
      return NextResponse.json({ ERROR: (err as Error).message });
   }
}

export async function PATCH(request: Request) {
   try {
      return NextResponse.json(null);
   } catch (err) {
      return NextResponse.json({ ERROR: (err as Error).message });
   }
}