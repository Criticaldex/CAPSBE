'use client'
import { Chart } from "./chart";
import { ChartDetail } from "./chartDetail";
import { useState } from "react";
import { getPlotLines, getUniversals, getUniversalsDetall, getHiper, getSeleccio, getHiperDetall, getSeleccioDetall } from "@/services/iqfs";


export async function ChartLayout({ year, centros, universals, hiper, seleccio, plotMatma, plotHiper, plotSele }: any) {
   const [seccioUni, setSeccioUni] = useState('biosimilars');
   const [seccioHiper, setSeccioHiper] = useState('aines');
   const [seccioSele, setSeccioSele] = useState('mpoc_seleccio');
   const universalsDetall = await getUniversalsDetall(year, centros, seccioUni);
   const hiperDetall = await getHiperDetall(year, centros, seccioHiper);
   const seleccioDetall = await getSeleccioDetall(year, centros, seccioSele);

   return (
      <article className="min-h-fit">
         <section className="flex flex-row justify-between mx-2 mb-2">
            <div className="w-1/2 p-1 ml-2 h-auto bg-bgLight rounded-md shadow-xl">
               <Chart
                  name={'Universals'}
                  data={universals.data}
                  categories={universals.categories}
                  setter={setSeccioUni}
               />
            </div>
            <div className="w-1/2 p-1 ml-2 h-auto bg-bgLight rounded-md shadow-xl">
               <ChartDetail
                  name={seccioUni}
                  data={universalsDetall}
                  objectius={plotMatma}
               />
            </div>
         </section>
         <section className="flex flex-row justify-between mx-2 mb-2">
            <div className="w-1/2 p-1 ml-2 h-auto bg-bgLight rounded-md shadow-xl">
               <Chart
                  name={'Hiperprescripció'}
                  data={hiper.data}
                  categories={hiper.categories}
                  setter={setSeccioHiper}
               />
            </div>
            <div className="w-1/2 p-1 ml-2 h-auto bg-bgLight rounded-md shadow-xl">
               <ChartDetail
                  name={seccioHiper}
                  data={hiperDetall}
                  objectius={plotHiper}
               />
            </div>
         </section>
         <section className="flex flex-row justify-between mx-2 mb-2">
            <div className="w-1/2 p-1 ml-2 h-auto bg-bgLight rounded-md shadow-xl">
               <Chart
                  name={'Selecció'}
                  data={seleccio.data}
                  categories={seleccio.categories}
                  setter={setSeccioSele}
               />
            </div>
            <div className="w-1/2 p-1 ml-2 h-auto bg-bgLight rounded-md shadow-xl">
               <ChartDetail
                  name={seccioSele}
                  data={seleccioDetall}
                  objectius={plotSele}
               />
            </div>
         </section>
      </article>
   );
}
