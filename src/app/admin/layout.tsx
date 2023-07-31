import { GetLinksAdmin } from "./routing";
import { getYears } from "@/services/contracts";

export default async function ContractsLayout({ children }: any) {
   return (
      <div>
         <title>Admin</title>
         <div className="h-20 bg-light ml-16 text-right flex justify-start items-center">
            <GetLinksAdmin />
            <h1 className="right-0 absolute mr-10 text-right justify-end font-semibold text-2xl italic">Panell Administració</h1>
         </div>
         <hr className="w-11/12 m-auto mt-0 border-t-2 border-darkBlue" />
         <main className="m-4">
            {children}
         </main>
      </div>
   )
}
