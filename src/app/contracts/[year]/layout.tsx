import React from "react";
import { getMongoData, getCleanCenters, getTableIndicators } from "../../services/contracts";
import Link from "next/link";
import { ContractsTable } from "./table"
import { Chart } from "./[center]/chart";

export default async function loadContracts({ children, params }: any) {

   const { year } = params;
   const centros = await getCleanCenters(year);

   const indicadoresContrato = await getTableIndicators({ "Any": year });
   const infoChart = [
      {
         name: 'Sarria',
         data: [646, 321, 753, 914, 453, 367, 354, 489, 452, 574, 478, 358]
      },
      {
         name: 'Vallplasa',
         data: [367, 354, 489, 452, 574, 478, 358, 646, 321, 753, 914, 453]
      }
   ]

   return (
      <article className="min-h-fit">
         <section className="flex flex-row justify-between px-5">
            <ContractsTable
               data={indicadoresContrato}
               centros={centros}
            />
            <div className="basis-1/2">
               <Chart
                  name={'TOTAL EQA'}
                  data={infoChart}
               />
               {<div className="text-center m-auto absolute z-10 mt-3">
                  {centros.map((centro: any, i: number) => (
                     <Link href={centro.link} key={i} className="bg-gradient-to-r from-gray-600 to-gray-400 rounded-lg ml-3 py-2 px-5 hover:bg-gradient-to-r text-white">
                        {centro.name}
                     </Link>
                  ))}
               </div>}
               {children}
            </div>
         </section>
      </article>
   );
}
