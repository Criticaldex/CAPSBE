import { GetLinksCenters } from "./routing";
import { DemorasTable } from "./demoraTable";
import { getDemorasToday, getLastDate, getSectors } from "@/services/demoras";
import { getCenters } from "@/services/centros";

export default async function DemorasLayout({ children, params }: any) {
   const lastDate = await getLastDate();
   const day = lastDate.dia;
   const month = lastDate.mes;
   const year = lastDate.any;
   const date = day + '/' + month + '/' + year;

   const sectors = await getSectors({ ...lastDate });
   const demoras = await getDemorasToday(lastDate);

   return (

      <div>
         <title>Acc & Demora</title>
         <div className="mt-2 bg-light text-right flex justify-between items-center">

            <div className="bg-light text-right flex justify-end items-center">
               <h1 className="right-0 w-auto mx-10 font-semibold text-2xl italic">Indicadors Demora</h1>
            </div>
         </div>
         <hr className="w-11/12 m-auto mt-0 border-t-2 border-darkBlue" />
         <main className="m-2">
            <div className="flex-row mx-2 mb-2">
               <div>
                  {children}
               </div>
               <div className="flex grow p-1 bg-bgLight rounded-md ">
                  <DemorasTable
                     date={date}
                     data={demoras}
                     sectors={sectors}
                  />
               </div>
            </div>
         </main>
      </div>
   )
}