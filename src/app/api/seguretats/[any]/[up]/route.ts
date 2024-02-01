import mongoose from 'mongoose'
import dbConnect from '@/lib/dbConnect'
import SeguretatSchema from '@/schemas/seguretat'
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { any: string, up: string } }) {
   try {
      const dbName = 'Seguretat';
      await dbConnect();
      const db = mongoose.connection.useDb(dbName, { useCache: true });
      if (!db.models.seguretat) {
         db.model('seguretat', SeguretatSchema);
      }
      const seguretat = await db.models.seguretat.findOne(params).select('-_id').lean();

      return NextResponse.json(seguretat);
   } catch (err) {
      return NextResponse.json({ ERROR: (err as Error).message });
   }
}