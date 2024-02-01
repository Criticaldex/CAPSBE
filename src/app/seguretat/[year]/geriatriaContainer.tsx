'use client'
import { Chart } from "./chart";
import { ChartDetail } from "./chartDetail";
import { useState, useEffect } from "react";
import { getPlotLines, getGeriatriaDetall } from "@/services/seguretats";
import { Loading } from "@/components/loading.component";

export function GeriatriaContainer({ year, centros, geriatria }: any) {
   const [seccio, setSeccio] = useState('Pac 75 medicaments inapropiats');
   const [detall, setDetall] = useState(null);
   const [plotLines, setPlotLines] = useState(null);
   const [isLoading, setLoading] = useState(true)

   useEffect(() => {
      getGeriatriaDetall(year, centros, seccio)
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
      <div>
         <section className="grid grid-cols-2 gap-1 m-2 bg-geriatria p-1 rounded-md">
            <div className="col-span-2 flex bg-bgLight rounded-md p-3">
               <h1 className="flex self-center basis-2/6 uppercase text-2xl">Totals</h1>
               <div className="flex grow justify-around text-center">
                  {geriatria.data.map(({ name, total }: any, index: number) => (
                     <div className="centrosGeriatria" key={index}>
                        <p className="flex p-2 rounded-md border-y-2 h-full text-xl font-bold">
                           {name}: {total}
                        </p>
                     </div>
                  ))}
               </div>
            </div>
            <div className="p-1 bg-bgLight rounded-md">
               <Chart
                  name={'Geriatria, Sistema Cardiovascular, Renal / Digestiu'}
                  data={geriatria.data}
                  categories={geriatria.categories}
                  setter={setSeccio}
               />
            </div>
            <div className="p-1 bg-bgLight rounded-md">
               <ChartDetail
                  name={seccio}
                  data={detall}
                  objectius={plotLines}
               />
            </div>
         </section>
      </div>
   );
}
