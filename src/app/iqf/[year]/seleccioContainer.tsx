'use client'
import { Chart } from "./chart";
import { ChartDetail } from "./chartDetail";
import { useState, useEffect } from "react";
import { getPlotLines, getSeleccioDetall } from "@/services/iqfs";
import { Loading } from "@/components/loading.component";

export function SeleccioContainer({ year, centros, seleccio }: any) {
   const [seccio, setSeccio] = useState('antihipertensius');
   const [detall, setDetall] = useState(null);
   const [plotLines, setPlotLines] = useState(null);
   const [isLoading, setLoading] = useState(true)

   useEffect(() => {
      getSeleccioDetall(year, centros, seccio)
         .then((res: any) => {
            setDetall(res)
            getPlotLines(seccio)
               .then((res: any) => {
                  setPlotLines(res)
                  setLoading(false)
               });
         });

   }, [seccio, year, centros])

   if (isLoading) return <Loading />

   return (
      <article>
         <div className="m-2 mb-1 flex justify-between bg-bgLight rounded-md p-4 border-4 border-seleccio">
            <h1 className="uppercase text-2xl">Totals Selecció</h1>
            {seleccio.data.map(({ name, total }: any, index: number) => (
               <div className="grow text-center centrosSeleccio" key={index}>
                  <p className="w-fit m-auto border-y-2 border-seleccio px-4 rounded h-full text-xl font-bold">
                     {name}: {total[total.length - 1]}
                  </p>
               </div>
            ))}
         </div>
         <section className="grid grid-cols-2 mx-2 mb-2 bg-seleccio p-1 rounded-lg">
            <div className="p-1 h-auto bg-bgLight rounded-md shadow-xl">
               <Chart
                  name={'Selecció'}
                  data={seleccio.data}
                  categories={seleccio.categories}
                  setter={setSeccio}
               />
            </div>
            <div className="p-1 ml-2 h-auto bg-bgLight rounded-md shadow-xl">
               <ChartDetail
                  name={seccio}
                  data={detall}
                  objectius={plotLines}
               />
            </div>
         </section>
      </article>
   );
}
