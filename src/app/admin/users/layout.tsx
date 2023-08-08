import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function UsersLayout({ children }: any) {
   const session = await getServerSession(authOptions);
   if (session?.user.role != "0") {
      redirect("/admin/profile");
   }
   return (
      <div>
         {children}
      </div>
   )
}