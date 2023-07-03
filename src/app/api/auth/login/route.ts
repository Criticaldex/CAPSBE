import dbConnect from '@/lib/dbConnect'
import User from '@/models/user'
import { compare } from 'bcryptjs';
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
   const body = await request.json()
   if (body.email && body.password) {
      await dbConnect('Auth');
      try {
         const user: any = await User.findOne({ "email": body.email }).select('-_id').lean();
         if (user && await compare(body.password, user.hash)) {
            const { hash, ...userWithoutHash } = user;
            return NextResponse.json(userWithoutHash);
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