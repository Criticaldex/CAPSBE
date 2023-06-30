"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

type Props = {
   children?: React.ReactNode;
};

export const NextAuthProvider = ({ children }: Props) => {

   return <SessionProvider>{children}</SessionProvider>;
};
