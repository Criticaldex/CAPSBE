import { GetLinksCenters } from "./routing";
import { getCenters } from "@/services/centros";

export default async function ContractsLayout({ children }: any) {
   const centros = await getCenters();

   return (
      <div>
         <title>IQF</title>
         <div className="mt-2 bg-light text-right flex justify-between items-center">
            <div className="flex justify-start grow mb-2 mx-2">
               <GetLinksCenters
                  centers={centros}
               />
            </div>
            <div className="bg-light text-right flex justify-end items-center">
               <h1 className="right-0 w-auto mx-10 font-semibold text-2xl italic">Indicadors Demora</h1>
            </div>
         </div>
         <hr className="w-11/12 m-auto mt-0 border-t-2 border-darkBlue" />
         <main className="m-2">
            {children}
         </main>
      </div>
   )
}