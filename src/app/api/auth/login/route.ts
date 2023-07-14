import mongoose from 'mongoose'
import dbConnect from '@/lib/dbConnect'
import userSchema from '@/schemas/user'
import { compare } from 'bcryptjs';
import { NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

export async function POST(request: Request) {
   const body = await request.json()
   if (body.email && body.password) {
      await dbConnect();
      const db = mongoose.connection.useDb('Auth', { useCache: true });
      if (!db.models.user) {
         db.model('user', userSchema);
      }
      try {
         const user: any = await db.models.user.findOne({ "email": body.email }).select('-_id').lean();
         if (user && await compare(body.password, user.hash)) {
            const date = new Date();
            if (user.license.start < date && user.license.end > date) {
               process.env.MONGO_DB = user.db;
               revalidateTag('dbData'); //get new data instead of the one from cache
               const { hash, ...userWithoutHash } = user;
               return NextResponse.json(userWithoutHash);
            } else {
               return NextResponse.json({ ERROR: "La llicencia ha caducat!" });
            }
         } else {
            return NextResponse.json({ ERROR: "Email o contrasenya incorrectes!" });
         }
      } catch (err) {
         return NextResponse.json({ ERROR: (err as Error).message });
      }
   } else {
      return NextResponse.json({ ERROR: 'Email i contrasenya obligatoris!' });
   }
}