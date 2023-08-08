import { GetLinksYears, GetSectionButtons } from "./routing";
import { getYears } from "@/services/contracts";

export default async function ContractsLayout({ children }: any) {
   const years = await getYears();
   return (
      <div>
         <title>Indicadors Contracte</title>
         <div className="h-20 bg-light text-right flex justify-end items-center">
            <h1 className="right-0 w-auto mr-10 font-semibold text-2xl italic">Indicadors Contracte</h1>
         </div>
         <hr className="w-11/12 m-auto mt-0 border-t-2 border-darkBlue" />
         <main className="m-2">
            <div className="flex justify-between mb-2">
               <GetSectionButtons />
               <GetLinksYears
                  years={years}
               />
            </div>

            {children}
         </main>
      </div>
   )
}