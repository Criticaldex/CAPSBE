"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { IoIosLogOut, IoIosPerson } from "react-icons/io"

export const LoginButton = () => {
   return (
      <button className="hover:text-darkBlue py-2 grid grid-cols-[max-content_max-content] gap-x-4 pt-2 pr-0 pb-2 pl-3 items-center" onClick={() => signIn()}>
         Sign in
      </button>
   );
};

export const RegisterButton = () => {
   return (
      <Link href="/register" className="hover:text-darkBlue py-2 grid grid-cols-[max-content_max-content] gap-x-4 pt-2 pr-0 pb-2 pl-3 items-center">
         Register
      </Link>
   );
};

export const LogoutButton = () => {
   const { data: session } = useSession();
   if (session && session.user) {
      return (
         <div>
            <ProfileButton />
            <button className="hover:text-darkBlue py-2 grid grid-cols-[max-content_max-content] gap-x-4 pt-2 pr-0 pb-2 pl-3 items-center"
               onClick={() => signOut({ redirect: true, callbackUrl: "/" })}>
               <IoIosLogOut size={20} />
               <span className="text-lg">
                  Sortir
               </span>
            </button>
         </div>
      );
   } else {
      return (null);
   }

};

export const ProfileButton = () => {
   const { data: session } = useSession();
   return (
      <Link href="/" className="hover:text-darkRed py-2 grid grid-cols-[max-content_max-content] gap-x-4 pt-2 pr-0 pb-2 pl-3 items-center">
         <IoIosPerson size={20} />
         <span className="text-lg">
            {session?.user.lastname}, {session?.user.name}
         </span>
      </Link>
   )
};
