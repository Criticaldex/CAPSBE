import { DemorasTable } from "./demoraTable";
import { getDemorasToday, getLastDate, getSectors } from "@/services/demoras";
import { getCardAccessibilitats, getLastYear, getLastMonth } from "@/services/accessibilitat";
import { getCenters } from "@/services/centros";
import { CardsAccessibilitat } from "./accessibilitatCard";

export default async function DemorasLayout({ children, params }: any) {
   const lastDate = await getLastDate();
   const lastYear = await getLastYear();
   const lastMonth = await getLastMonth(lastYear);
   const centers = await getCenters();

   const day = lastDate.dia;
   const month = lastDate.mes;
   const year = lastDate.any;
   const date = day + '/' + month + '/' + year;

   const sectors = await getSectors({ ...lastDate });
   const demoras = await getDemorasToday(lastDate);
   const accessibilitats = await getCardAccessibilitats({ any: lastYear });

   return (
      <div>
         <title>Accessibilitat i Demora</title>
         <div className="mt-2 bg-light text-right flex justify-between items-center">
            <h1 className="right-0 w-auto mx-10 font-semibold text-2xl italic">Indicadors Accessibilitat</h1>
            <h1 className="right-0 w-auto mx-10 font-semibold text-2xl italic">{lastMonth} {lastYear}</h1>
         </div>
         <hr className="w-11/12 m-auto mt-0 border-t-2 border-darkBlue" />
         <main className="m-2">
            <div className="flex-row mx-2 mb-2">
               <div>
                  <div className="flex justify-around mb-2">
                     {centers.map((centro: any) => {
                        return <CardsAccessibilitat
                           accessibilitats={accessibilitats[centro.id]}
                           centro={centro.id}
                           key={centro.id}
                        />
                     })}
                  </div>
                  {children}
               </div>
               <div className="mt-2 bg-light text-right flex justify-between items-center">
                  <h1 className="right-0 w-auto mx-10 font-semibold text-2xl italic">Indicadors Demora</h1>
                  <h1 className="right-0 w-auto mx-10 font-semibold text-2xl italic">{date}</h1>
               </div>
               <hr className="w-11/12 m-auto my-2 border-t-2 border-darkBlue" />
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