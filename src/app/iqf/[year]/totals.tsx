'use client'
import { getCenters } from "@/services/centros";
import { getTotalsIqf } from "@/services/iqfs";
import { GaugeChart } from "./gaugeChart";
import Highcharts, { color } from "highcharts";
import { TrendChart } from "./trendChart";

export function Totals({ iqfTotals }: any) {
   const iqf = iqfTotals
   const colores = ["#2caffe", "#544fc5", "#00e272", "#fe6a35", "#6b8abc", "#d568fb", "#2ee0ca", "#fa4b42", "#feb56a", "#91e8e12"]
   // const colores = Highcharts.getOptions().colors || []

   return (
      <section className="flex justify-around bg-bgLight w-full rounded-md py-2">
         {iqf.map((total: any, index: number) => (
            <div key={index} className={`text-center flex-1 flex flex-col m-auto`}>
               <div className="text-2xl font-bold">
                  {total.name}
               </div>
               <div className={`text-center max-w-min m-auto`}>
                  <GaugeChart
                     data={total}
                     numColor={colores[index]}
                  />
               </div>
               <div className={`text-center max-w-sm m-auto flex`}>
                  <div className="w-full">
                     <TrendChart
                        data={total}
                        numColor={colores[index]}
                     />
                  </div>
                  <div>
                     {total.diferencia != null ? (
                        <p className={`text-xl font-bold ${total.diferencia < 0 ? "text-red" : total.diferencia > 0 ? "text-green" : 'text-yellowCustom'}`}>
                           {total.diferencia < 0 ?
                              <span>&#8600;</span> :
                              total.diferencia > 0 ?
                                 <span>&#8599;</span> :
                                 <span>&#8594;</span>
                           }
                           {total.diferencia}
                        </p>
                     ) : (
                        <p></p>
                     )}
                  </div>
               </div>
            </div>
         ))}
      </section>
   )
}