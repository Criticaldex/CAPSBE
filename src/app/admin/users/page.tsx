import { RegisterForm } from "./form";
import { getSession } from "@/services/session"
import { ContractsTable } from "./table"
import { getUsers } from "@/services/users"

export default async function RegisterPage() {
   const session = await getSession();
   const users = await getUsers();

   return (
      <div className="flex justify-center items-center grid-flow-col">
         <h1>Usuaris</h1>
         <div className="flex flex-auto">
            <ContractsTable
               users={users}
               session={session}
            />
            <RegisterForm
               session={session} />
         </div>
      </div >
   );
}
