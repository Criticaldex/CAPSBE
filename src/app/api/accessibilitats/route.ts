import mongoose from 'mongoose'
import dbConnect from '@/lib/dbConnect'
import accsessibilitatSchema, { AccessibilitatIface } from '@/schemas/accessibilitat'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
   try {
      const body = await request.json()
      const fields = (body.fields) ? body.fields.join(' ') : '';
      const dbName = body.db;
      await dbConnect();
      const db = mongoose.connection.useDb(dbName, { useCache: true });
      if (!db.models.accessibilitat) {
         db.model('accessibilitat', accsessibilitatSchema);
      }
      const accessibilitat: any = await db.models.accessibilitat.find(body.filter).select(fields).sort(body.sort).lean();
      return NextResponse.json(accessibilitat);
   } catch (err) {
      return NextResponse.json({ ERROR: (err as Error).message });
   }
}

// export async function PATCH(request: Request) {
//    try {
//       const body: DemoraIface = await request.json();
//       if (!body.identificador || !body.any) {
//          return NextResponse.json(`identificador i any obligatoris!`);
//       }

//       let filter = {
//          any: body.any,
//          centre: body.centre,
//          identificador: body.identificador
//       };

//       const { dbName, ...bodyWithoutDB } = body
//       await dbConnect();
//       const db = mongoose.connection.useDb(dbName, { useCache: true });
//       if (!db.models.indicator) {
//          db.model('indicator', demoraSchema);
//       }
//       const res = await db.models.indicator.findOneAndUpdate(filter, bodyWithoutDB, {
//          new: true,
//          rawResult: true
//       }).lean();

//       return NextResponse.json(res);
//    } catch (err) {
//       return NextResponse.json({ ERROR: (err as Error).message });
//    }
// }