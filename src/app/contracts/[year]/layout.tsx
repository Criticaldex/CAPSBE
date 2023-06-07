import React, { useState } from "react";
import { getMongoData, getCleanCenters } from "../../services/contracts";
import Link from "next/link";
import { Chart } from "./[center]/chart";
//require('../../funciones')


const options = {
   chart: { type: 'spline' },
   lang: {
      noData: "No hi han dades disponibles"
   },
   noData: {
      style: {
         fontSize: '26px',
         fontWeight: 'bold',
         color: '#666666'
      },
   },
   title: {
      text: 'TOTAL EQA'
   },
   series: [
      {
         name: 'Sarria',
         data: [646, 321, 753, 914, 453, 367, 354, 489, 452, 574, 478, 358]
      },
      {
         name: 'Vallplasa',
         data: [367, 354, 489, 452, 574, 478, 358, 646, 321, 753, 914, 453]
      }
   ],
   xAxis: {
      categories: ['Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juliol', 'Agost', 'Septembre', 'Octubre', 'Novembre', 'Decembre'],
      startOnTick: true
   },
   credits: {
      text: ""
   },
   legend: {
      enabled: true,
      align: 'right',
      verticalAlign: 'middle',
      width: 100
   },
   tooltip: {
      shared: false
   }
}

export default async function loadContracts({ children, params }: any) {

   const { year } = params;
   const centros = await getCleanCenters(year);
   const indicadoresContrato: any = await Promise.all(centros.map((centro: string, i: number) => {
      return getMongoData({ "Any": year, "Centre": i.toString() })
   }))

   return (
      <article className="min-h-fit">
         <section className="flex flex-row justify-between px-10">
            <div className="table-auto text-center border rounded-lg overflow-hidden basis-1/2 mr-2">
               <table className="table-auto text-left m-auto min-w-full divide-x divide-gray-200" id="cliqueo">
                  <thead className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-300 dark:bg-neutral-800">
                     <tr className="text-xl">
                        <th className="px-3 py-3">Indicadores</th>
                        {centros.map((centro: any, i: number) => (
                           <th className="px-3 py-3 text-center" key={i}>{centro.name}</th>
                        ))}
                     </tr>
                  </thead>
                  <tbody>
                     {indicadoresContrato[0].map((dato: any, index: string) => (
                        <tr id={index} key={index} className="bg-yellowCustom even:bg-redCustom hover:bg-opacity-80 p-96 cursor-pointer">
                           <th className="px-2 py-3 text-neutral-800" key={dato.Indicador}>{dato.Indicador}</th>
                           {indicadoresContrato.map((contractCentro: any, indice: number) => (
                              <td className="px-2 py-2 text-center" key={index + indice}>{contractCentro[index].Resultat[contractCentro[index].Resultat.length - 1]} /<small><b> 75</b></small></td>
                           ))}
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
            <div className="basis-1/2">
               <Chart params={options} />
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
         {/* <ContractsGraph centro= {0} /> */}
      </article>
   );
}
