import { RegisterFormOld } from "./form_old";
import { UsersForm } from "./form";
import { getSession } from "@/services/session"
import { AdminTable } from "./table"
import { getUsers } from "@/services/users"

export default async function RegisterPage() {
   const session = await getSession();
   const users = await getUsers();

   return (
      <div className="flex flex-col">
         <h1 className="flex">Usuaris</h1>
         <div className="flex flex-row flex-nowrap justify-between mt-2">
            <div className="flex mr-2 basis-3/4 rounded-md">
               <AdminTable
                  users={users}
                  session={session}
               />
            </div>
            <div className="flex basis-1/4 rounded-md bg-light">
               <UsersForm />
               {/* <RegisterFormOld
                  session={session}
               /> */}
            </div>
         </div>
      </div >
   );
}
