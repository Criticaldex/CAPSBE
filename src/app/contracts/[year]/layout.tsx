import React from "react";
import { getMongoData, getCleanCenters, getTableIndicators } from "../../services/contracts";
import Link from "next/link";
import { ContractsTable } from "./table"

export default async function loadContracts({ children, params }: any) {

   const { year } = params;
   const centros = await getCleanCenters(year);

   const indicadoresContrato = await getTableIndicators({ "Any": year });

   return (
      <section className="min-h-screen pt-24">
         <ContractsTable
            data={indicadoresContrato}
            centros={centros}
         />

         {<div className="text-center pt-10 w-2/3 m-auto">
            {centros.map((centro: any, i: number) => (
               <Link href={centro.link} key={i}>
                  {centro.name}
               </Link>
            ))}
         </div>}
         {children}
      </section>
   );
}
