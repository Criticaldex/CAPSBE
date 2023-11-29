import { getCenters } from "@/services/centros";
import { getCallsToday } from "@/services/calls";
import { getIntervalsDay, getHoursChart, getIntervalsChart, getHoursDrilldown, getIntervalsDrilldown } from "@/services/call_intervals";
import { CallsTable } from "./callsTable";

export default async function ContractsLayout({ children }: any) {
   const year = new Date().getFullYear();
   const pad = '00';
   const day = (pad + (new Date().getDate() - 1)).slice(-pad.length);
   const month = (pad + (new Date().getMonth() + 1)).slice(-pad.length);
   const date = day + '/' + month + '/' + year;
   const centros = await getCenters();
   const calls = await getCallsToday();

   return (
      <div>
         <title>Quadre Comandament</title>
         <div className="mt-2 bg-light text-right flex justify-between items-center">
            <div className="flex justify-between grow mb-2 mx-2">
               {/* links */}
            </div>
            <div className="bg-light text-right flex justify-end items-center">
               <h1 className="right-0 w-auto mx-10 font-semibold text-2xl italic">Quadre Comandament</h1>
            </div>
         </div>
         <hr className="w-11/12 m-auto border-b border-darkBlue" />
         <main className="m-2">
            <div className="flex mx-2 mb-2">
               <div className="flex grow p-1 bg-bgLight rounded-md shadow-xl">
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