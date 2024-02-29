import { getCenters } from "@/services/centros";
import { getCallsToday } from "@/services/calls";
import { getIntervalsDay, getHoursChart, getIntervalsChart, getHoursDrilldown, getIntervalsDrilldown } from "@/services/call_intervals";
import { CallsTable } from "./callsTable";

export default async function ContractsLayout({ children }: any) {
   let ayer = new Date();
   ayer.setDate(ayer.getDate() - 1);
   const pad = '00';

   const day = (pad + ayer.getDate().toString()).slice(-pad.length);
   const month = (pad + (ayer.getMonth() + 1).toString()).slice(-pad.length);
   const year = ayer.getFullYear().toString();
   const date = day + '/' + month + '/' + year;
   const centros = await getCenters();
   const calls = await getCallsToday(ayer);

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