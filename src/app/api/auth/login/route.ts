import dbConnect from '@/lib/dbConnect'
import User from '@/models/user'
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
   const body = await request.json()
   if (body.username && body.password) {

      await dbConnect('Auth');

      try {
         const user: any = await User.findOne({ "username": body.username }).lean();
         if (user && bcrypt.compareSync(body.password, user.hash)) {
            return NextResponse.json(user);
         } else {
            return NextResponse.json({ ERROR: "Contrasenya incorrecte!" });
         }
      } catch (err) {
         return NextResponse.json({ ERROR: (err as Error).message });
      }
   } else {
      return NextResponse.json({ message: 'Usuari i contrasenya obligatoris!' });
   }
}