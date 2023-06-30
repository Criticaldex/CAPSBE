import dbConnect from '@/lib/dbConnect'
import User from '@/models/user'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
   const body = await request.json()
   if (body.email && body.password) {

      await dbConnect('Auth');

      try {
         const user: any = await User.findOne({ "email": body.email }).lean();
         if (user) {
            return NextResponse.json(user);
         } else {
            return NextResponse.json({ ERROR: "Email incorrecte!" });
         }
      } catch (err) {
         return NextResponse.json({ ERROR: (err as Error).message });
      }
   } else {
      return NextResponse.json({ ERROR: 'Email i contrasenya obligatoris!' });
   }
}