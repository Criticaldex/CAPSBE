'use client'
import { GaugeChart } from "./gaugeChart";
import { TrendChart } from "./trendChart";

export function Totals({ seguretatTotals }: any) {
   return (
      <section className="flex m-2 justify-around bg-bgLight rounded-md p-3 overflow-hidden">
         {seguretatTotals.map((total: any, index: number) => (
            <div key={index} className={`text-center flex-auto w-48 max-w-sm flex flex-col`}>
               <div className="text-2xl font-bold">
                  {total.name}
               </div>
               <div className="text-center grow m-2">
                  <GaugeChart
                     data={total}
                     numColor={`var(--highcharts${index})`}
                     numColorBg={`var(--highcharts${index}_bg)`}
                  />
               </div>
               {/* <div className="text-center max-w-sm m-auto flex">
                  <div>
                     <TrendChart
                        data={total}
                        numColor={`var(--highcharts${index})`}
                     />
                  </div>
                  <div>
                     {total.diferencia != null ? (
                        <p className={`text-xl font-bold ${total.diferencia < 0 ? "text-red" : total.diferencia > 0 ? "text-green" : 'text-yellow'}`}>
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
               </div> */}
            </div>
         ))}
      </section>
   )
}