'use client'
import { Chart } from "../chart";
import { ChartDetail } from "../chartDetail";
import { useState, useEffect } from "react";
import { getPlotLines, getSeleccioDetall } from "@/services/iqfs";
import { Loading } from "@/components/loading.component";

export function ChartContainer({ year, centros, seleccio }: any) {
   const [seccio, setSeccio] = useState('mpoc_seleccio');
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
      <section className="flex flex-row justify-between mx-2 mb-2">
         <div className="w-1/2 p-1 ml-2 h-auto bg-bgLight rounded-md shadow-xl">
            <Chart
               name={'Selecció'}
               data={seleccio.data}
               categories={seleccio.categories}
               setter={setSeccio}
            />
         </div>
         <div className="w-1/2 p-1 ml-2 h-auto bg-bgLight rounded-md shadow-xl">
            <ChartDetail
               name={seccio}
               data={detall}
               objectius={plotLines}
            />
         </div>
      </section>
   );
}
