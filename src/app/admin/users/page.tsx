import { UsersForm } from "@/components/userForm.component";
import { getSession } from "@/services/session"
import { AdminTable } from "./table"
import { getUsers } from "@/services/users"
import { useState } from "react";

export default async function RegisterPage() {
   const session = await getSession();
   const users = await getUsers();

   return (
      <div className="flex flex-col">
         <h1 className="flex">Usuaris</h1>
         <AdminTable
            users={users}
            session={session}
         />
      </div >
   );
}
