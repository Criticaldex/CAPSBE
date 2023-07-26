import { getCenters } from "@/services/centros";
import { getEqasContracts } from "@/services/eqas";
import { Chart } from "./chart";

export default async function LayoutDashboard({ children, params }: any) {
   const { year } = params;
   const centros = await getCenters();
   const eqas = await getEqasContracts(year, centros);

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
            <div className="w-1/3 p-1 mr-2 bg-bgLight rounded-md shadow-xl">
               <Chart
                  name={'TOTAL EQA'}
                  data={eqas}
               />
            </div>
            <div className="w-1/3 p-1 mr-2 bg-bgLight rounded-md shadow-xl">
               <h1 className="text-center text-xl font-bold my-4">DMA</h1>
            </div>
            <div className="w-1/3 p-1 bg-bgLight rounded-md shadow-xl">
               <h1 className="text-center text-xl font-bold my-4">IQF</h1>
            </div>
         </div>
      </article>
   );
}
