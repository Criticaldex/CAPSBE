import React from "react";
import { getTableIndicators } from "@/app/services/contracts";
import { getContractsCenters } from "@/app/services/centros";
import Link from "next/link";
import { ContractsTable } from "./table"
import { Chart } from "./[center]/chart";
import { usePathname } from "next/navigation";
import { CenterChartButtons } from "../routing";

export default async function loadContracts({ children, params }: any) {

   const { year } = params;
   const centros = await getContractsCenters(year);

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
               <CenterChartButtons
                  year={year}
                  centros={centros}
               />
               {children}
            </div>
         </section>
      </article>
   );
}
