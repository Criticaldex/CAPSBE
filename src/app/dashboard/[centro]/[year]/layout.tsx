import { getCenters } from "@/services/centros";
import { getEqasContracts } from "@/services/eqas";
import { Chart } from "./chart";
import { Iqf } from "./iqf";
import { getBasal, getIqfDashboard } from "@/services/iqfs";
import { getDmaAssignada, getDmaDashboard, getRegressioLineal } from "@/services/dmas";
import { Dma } from "./dma";
import { getCallsToday } from "@/services/calls";
import { CallsTable } from "./callsTable";

export default async function LayoutDashboard({ children, params }: any) {
   const { year, centro } = params;
   let up: string = '';
   let nameCentro: string = '';
   const centros = await getCenters();
   centros.map((center: any) => {
      if (center.id == centro) {
         up = center.up
         nameCentro = center.name
      }
   })

   const calls = await getCallsToday();
   const eqas = await getEqasContracts(year, centros);
   const iqf = await getIqfDashboard(up);
   const basal = await getBasal(up);

   const dma = await getDmaDashboard(up);
   const dma_assignada = await getDmaAssignada(up);
   const dma_regressio_lineal = await getRegressioLineal(up, dma);

   return (
      <article className="min-h-fit">
         <section className="flex flex-row justify-between mx-2 mb-2">
            <div id='tabla_dashboard' className="w-3/4 h-auto bg-bgLight rounded-md shadow-xl">
               {children}
            </div>
            <div className="w-1/4 p-1 ml-2 h-auto bg-bgLight rounded-md shadow-xl">
               <Chart
                  name={'TOTAL EQA'}
                  data={eqas}
               />
            </div>
         </section>
         <div className="flex flex-row justify-between mx-2 mb-2">
            <div className="w-1/2 p-1 mr-1 bg-bgLight rounded-md shadow-xl">
               <Dma
                  name={`DMA ${nameCentro}`}
                  data={dma}
                  objectiu={dma_assignada}
                  regresion={dma_regressio_lineal}
               />
            </div>
            <div className="w-1/2 p-1 ml-1 bg-bgLight rounded-md shadow-xl">
               <Iqf
                  name={`IQF ${nameCentro}`}
                  data={iqf}
                  objectiu={basal}
               />
            </div>
         </div>
         <div className="flex flex-row justify-between mx-2 mb-2">
            <div className="w-screen p-1 bg-bgLight rounded-md shadow-xl">
               <CallsTable
                  data={calls}
                  centros={centros}
               />
            </div>
         </div>
      </article>
   );
}

