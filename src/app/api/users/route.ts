import dbConnect from '@/lib/dbConnect'
import User, { UserIface } from '@/models/user'
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";
import { hash } from 'bcryptjs';

export async function POST(request: Request) {
   try {
      const session = await getServerSession(authOptions);

      if (!session) {
         return new NextResponse(
            JSON.stringify({ message: "You are not logged in" }),
            { status: 401 }
         );
      }
      const body: UserIface = await request.json();
      const saltRounds = 10;
      const aYearFromNow = new Date();
      aYearFromNow.setFullYear(aYearFromNow.getFullYear() + 1);
      const fields = {
         name: (body.name) ? body.name : null,
         lastname: (body.lastname) ? body.lastname : null,
         email: (body.email) ? body.email : null,
         hash: (body.password) ? await hash(body.password, saltRounds) : null,
         license: {
            token: (body.license) ? body.license : null,
            start: (body.license) ? new Date().valueOf() : null,
            end: (body.license) ? aYearFromNow.valueOf() : null,
         },
         server: (body.server) ? body.server : null,
         db: (body.db) ? body.db : null,
         role: (body.role) ? body.role : null
      };

      await dbConnect(process.env.MONGO_AUTH_DB);
      const user = await User.create(fields);
      return NextResponse.json(`Usuari ${user.email} creat!`);
   } catch (err) {
      return NextResponse.json({ ERROR: (err as Error).message });
   }
}
