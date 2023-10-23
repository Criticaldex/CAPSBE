import { getSession } from "@/services/session"
import { getUsers } from "@/services/users"

export default async function RegisterPage() {
   const session = await getSession();
   const users = await getUsers();

   return (
      <div className="flex flex-col">
         <h1>Session</h1>
         <a>{JSON.stringify(session, null, 3)}</a><br />
         <h1>Users</h1>
         <a>{JSON.stringify(users, null, 3)}</a>
      </div >
   );
}