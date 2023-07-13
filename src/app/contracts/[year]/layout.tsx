import React from "react";
import { getTableIndicators } from "@/services/contracts";
import { getContractsCenters } from "@/services/centros";
import { getEqasContracts } from "@/services/eqas";
import { ContractsTable } from "./table"
import { Chart } from "./[center]/chart";
import { GetLinksCenters } from "../routing";

export default async function loadContracts({ children, params }: any) {

   const { year } = params;
   const centros = await getContractsCenters(year);
   const eqas = await getEqasContracts(year, centros);

   const indicadoresContrato = await getTableIndicators(year);

   return (
      <article className="min-h-fit">
         <section className="flex flex-row justify-between px-5">
            <ContractsTable
               data={indicadoresContrato}
               centros={centros}
            />
            <div className="w-1/2">
               <Chart
                  name={'TOTAL EQA'}
                  data={eqas}
               />
               <GetLinksCenters
                  centros={centros}
               />
               {children}
            </div>
         </section>
      </article >
   );
}
