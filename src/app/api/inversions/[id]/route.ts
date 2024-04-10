import mongoose from 'mongoose'
import dbConnect from '@/lib/dbConnect'
import InversioSchema, { InversioIface } from '@/schemas/inversio'
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
   try {
      const dbName = 'Capsbe';
      await dbConnect();
      const db = mongoose.connection.useDb(dbName, { useCache: true });
      if (!db.models.inversion) {
         db.model('inversion', InversioSchema);
      }
      const inversio = await db.models.inversion.findById(params.id).lean();

      return NextResponse.json(inversio);
   } catch (err) {
      return NextResponse.json({ ERROR: (err as Error).message });
   }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
   try {
      const dbName = 'Capsbe';
      const body: any = await request.json();
      await dbConnect();
      const db = mongoose.connection.useDb(dbName, { useCache: true });
      if (!db.models.inversion) {
         db.model('inversion', InversioSchema);
      }
      const res = await db.models.inversion.findByIdAndUpdate(params.id, body, {
         new: true,
         upsert: true,
         rawResult: true
      }).lean();
      return NextResponse.json(res);
   } catch (err) {
      return NextResponse.json({ ERROR: (err as Error).message });
   }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
   try {
      const dbName = 'Capsbe';
      await dbConnect();
      const db = mongoose.connection.useDb(dbName, { useCache: true });
      if (!db.models.inversion) {
         db.model('inversion', InversioSchema);
      }
      const res = await db.models.inversion.findByIdAndRemove(params.id);
      return NextResponse.json(res);
   } catch (err) {
      return NextResponse.json({ ERROR: (err as Error).message });
   }
}