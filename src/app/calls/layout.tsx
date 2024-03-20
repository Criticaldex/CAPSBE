import { getCenters } from "@/services/centros";
import { getCallsToday, getLastDate } from "@/services/calls";
import { CallsTable } from "./callsTable";

export default async function ContractsLayout({ children }: any) {
   const lastDate = await getLastDate();
   const date = lastDate.dia + '/' + lastDate.mes + '/' + lastDate.any;
   const centros = await getCenters();
   const calls = await getCallsToday(lastDate);

   return (
      <div>
         <title>Quadre Comandament</title>
         <div className="mt-2 bg-light text-right flex justify-between items-center">
            <div className="flex justify-between grow mb-2 mx-2">
               {/* links */}
            </div>
            <div className="bg-light text-right flex justify-end items-center">
               <h1 className="right-0 w-auto mx-10 font-semibold text-2xl italic">Control Trucades</h1>
            </div>
         </div>
         <hr className="w-11/12 m-auto border-b border-darkBlue" />
         <main className="m-2">
            <div className="flex mx-2 mb-2">
               <div className="flex grow p-1 bg-bgLight rounded-md ">
                  <CallsTable
                     date={date}
                     data={calls}
                     centros={centros}
                  />
               </div>
            </div>
         </main>
      </div>
   )
}