"use client";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

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
   return (
      <button className="hover:text-darkBlue py-2 grid grid-cols-[max-content_max-content] gap-x-4 pt-2 pr-0 pb-2 pl-3 items-center" onClick={() => signOut()}>
         Sign Out
      </button>
   );
};

export const ProfileButton = () => {
   return <Link href="/profile" className="hover:text-darkBlue py-2 grid grid-cols-[max-content_max-content] gap-x-4 pt-2 pr-0 pb-2 pl-3 items-center">Profile</Link>;
};
