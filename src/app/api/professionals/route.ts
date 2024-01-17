import mongoose from 'mongoose'
import dbConnect from '@/lib/dbConnect'
import professionalSchema, { ProfessionalIface } from '@/schemas/professional'
import { NextResponse } from "next/server"

export async function POST(request: Request) {
   try {
      const body = await request.json();
      const fields = (body.fields) ? body.fields.join(' ') : '';
      const dbName = body.db;
      await dbConnect();
      const db = mongoose.connection.useDb(dbName, { useCache: true });
      if (!db.models.professional) {
         db.model('professional', professionalSchema);
      }
      const professional: ProfessionalIface = await db.models.professional.find(body.filter).select(fields).sort(body.sort).lean();
      return NextResponse.json(professional);
   } catch (err) {
      return NextResponse.json({ ERROR: (err as Error).message });
   }
}

export async function PATCH(request: Request) {
   try {
      const body: ProfessionalIface = await request.json();
      if (!body.identificador || !body.sector || !body.any || !body.centre) {
         return NextResponse.json(`identificador, sector, centre i any obligatoris!`);
      }
      let filter = {
         any: body.any,
         sector: body.sector,
         centre: body.centre,
         identificador: body.identificador
      };


      const { dbName, ...bodyWithoutDB } = body
      await dbConnect();
      const db = mongoose.connection.useDb(dbName, { useCache: true });
      if (!db.models.professional) {
         db.model('professional', professionalSchema);
      }
      const res = await db.models.professional.findOneAndUpdate(filter, bodyWithoutDB, {
         new: true,
         rawResult: true
      }).lean();

      return NextResponse.json(res);
   } catch (err) {
      return NextResponse.json({ ERROR: (err as Error).message });
   }
}