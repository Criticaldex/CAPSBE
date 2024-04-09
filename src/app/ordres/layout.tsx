import { getCenters } from "@/services/centros";
import { getYears } from "@/services/ordres";
import { GetLinksYears } from "./routing";

export default async function OrdresLayout({ children }: any) {
   const centros = await getCenters();
   const years = await getYears();

   return (
      <div>
         <title>Ordres Clíniques</title>
         <div className="mt-2 bg-light text-right flex justify-between items-center">
            <div className="flex justify-start grow mb-2 mx-2">
               <GetLinksYears
                  years={years}
               />
            </div>
            <div className="bg-light text-right flex justify-end items-center">
               <h1 className="right-0 w-auto mx-10 font-semibold text-2xl italic">Ordres Clíniques</h1>
            </div>
         </div>
         <hr className="w-11/12 m-auto border-b border-darkBlue" />
         <main className="m-2">
            {children}
         </main>
      </div>
   )
}