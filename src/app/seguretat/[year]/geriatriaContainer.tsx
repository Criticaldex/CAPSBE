'use client'
import { Chart } from "./chart";
import { ChartDetail } from "./chartDetail";
import { useState, useEffect } from "react";
import { getPlotLines, getUniversalsDetall } from "@/services/iqfs";
import { Loading } from "@/components/loading.component";

export function GeriatriaContainer({ year, centros, geriatria }: any) {
   const [seccio, setSeccio] = useState('matma');
   const [detall, setDetall] = useState(null);
   const [plotLines, setPlotLines] = useState(null);
   const [isLoading, setLoading] = useState(true)

   useEffect(() => {
      getUniversalsDetall(year, centros, seccio)
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
            <div className="p-1 bg-bgLight rounded-md shadow-xl">
               <Chart
                  name={'Universals'}
                  data={geriatria.data}
                  categories={geriatria.categories}
                  setter={setSeccio}
               />
            </div>
            <div className="p-1 bg-bgLight rounded-md shadow-xl">
               {/* <ChartDetail
                  name={seccio}
                  data={detall}
                  objectius={plotLines}
               /> */}
            </div>
         </section>
      </div>
   );
}
