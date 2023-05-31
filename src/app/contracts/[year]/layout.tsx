import React from "react";
import { getMongoData, getCleanCenters } from "../../services/contracts";
import Link from "next/link";

export default async function loadContracts({ children, params }: any) {

   const { year } = params;
   const centros = await getCleanCenters(year);
   const indicadoresContrato: any = await Promise.all(centros.map((centro: string, i: number) => {
      return getMongoData({ "Any": year, "Centre": i.toString() })
   }))

   return (
      <section className="min-h-screen pt-24">
         <div className="w-7/12 table-auto text-center m-auto border rounded-lg overflow-hidden">
            <table className="table-auto text-left m-auto min-w-full divide-x divide-gray-200">
               <thead className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-300 dark:bg-neutral-800">
                  <tr className="text-xl">
                     <th className="px-3 py-3">Indicadores</th>
                     {centros.map((centro: any) => (
                        <th className="px-3 py-3 text-center">{centro.name}</th>
                     ))}
                  </tr>
               </thead>
               <tbody>
                  {indicadoresContrato[0].map((dato: any, index: string) => (
                     <tr id={index} key={index} className="even:bg-gray-100 hover:bg-gray-200 p-96">
                        <td className="px-2 py-2" key={dato.Indicador}>{dato.Indicador}</td>
                        {indicadoresContrato.map((contractCentro: any, indice: number) => (
                           <td className="px-2 py-2 text-center" key={index + indice}>{contractCentro[index].Resultat[contractCentro[index].Resultat.length - 1]}</td>
                        ))}
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
         {<div className="text-center pt-10 w-2/3 m-auto">
            {centros.map((centro: any, indice: number) => (
               <Link href={centro.link}>
                  {centro.name}
               </Link>
            ))}
         </div>}
         { children }
         {/* <ContractsGraph centro= {0} /> */}
      </section>
   );
}
