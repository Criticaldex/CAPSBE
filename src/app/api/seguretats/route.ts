import mongoose from 'mongoose'
import dbConnect from '@/lib/dbConnect'
import SeguretatSchema from '@/schemas/seguretat'
import { NextResponse } from "next/server";

export async function POST(request: Request) {
   try {
      const body = await request.json();
      const fields = (body.fields) ? body.fields.join(' ') : '';
      const dbName = 'Seguretat';
      await dbConnect();
      const db = mongoose.connection.useDb(dbName, { useCache: true });
      if (!db.models.seguretat) {
         db.model('seguretat', SeguretatSchema);
      }
      const seguretat: any = await db.models.seguretat.find(body.filter).select(fields).sort(body.sort).lean();
      return NextResponse.json(seguretat);
   } catch (err) {
      return NextResponse.json({ ERROR: (err as Error).message });
   }
}

export async function PATCH(request: Request) {
   try {
      const body: any = await request.json();
      if (!body.any || !body.up) {
         return NextResponse.json(`identificador, any i centre obligatoris!`);
      }
      const filter = {
         any: body.any,
         up: body.up
      }

      const { dbName, ...bodyWithoutDB } = body
      await dbConnect();
      const db = mongoose.connection.useDb(dbName, { useCache: true });
      if (!db.models.seguretat) {
         db.model('seguretat', SeguretatSchema);
      }
      const res = await db.models.seguretat.findOneAndUpdate(filter, bodyWithoutDB, {
         new: true,
         upsert: false,
         rawResult: true
      }).lean();
      return NextResponse.json(res);
   } catch (err) {
      return NextResponse.json({ ERROR: (err as Error).message });
   }
}