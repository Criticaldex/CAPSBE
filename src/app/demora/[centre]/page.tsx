import { getCenters } from "@/services/centros";
import { getCallsToday } from "@/services/calls";
import { DemorasTable } from "./demoraTable";
import { getDemorasToday, getLastDate, getSectors } from "@/services/demoras";

export default async function ContractsLayout({ children }: any) {
   const lastDate = await getLastDate();
   const day = lastDate.dia;
   const month = lastDate.mes;
   const year = lastDate.any;
   const date = day + '/' + month + '/' + year;

   const centros = await getCenters();
   const sectors = await getSectors({ ...lastDate, centre: '0' });
   const demoras = await getDemorasToday(lastDate);

   return (
      <div className="flex mx-2 mb-2">
         <div className="flex grow p-1 bg-bgLight rounded-md ">
            <DemorasTable
               date={date}
               data={demoras}
               centros={centros}
               sectors={sectors}
            />
         </div>
      </div>
   )
}