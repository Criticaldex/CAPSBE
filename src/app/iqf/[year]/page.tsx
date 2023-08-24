import { getCenters } from "@/services/centros";
import { getEqasContracts } from "@/services/eqas";
import { Chart } from "./chart";
import { ChartDetall } from "./chartDetall";
import { getPlotLines, getUniversals, getUniversalsDetall } from "@/services/iqfs";
import { getSession } from "@/services/session";

export default async function LayoutDashboard({ children, params }: any) {
   const { year } = params;
   let seccioUni = 'matma';
   const session = await getSession();
   const centros = await getCenters();
   const eqas = await getEqasContracts(year, centros);
   const universals = await getUniversals(year, centros);
   const universalsDetall = await getUniversalsDetall(year, centros, seccioUni);
   const plotMatma = await getPlotLines('matma')
   // const basal = await getBasal(up);

   return (
      <article className="min-h-fit">
         <section className="flex flex-row justify-between mx-2 mb-2">
            <div className="w-1/2 p-1 ml-2 h-auto bg-bgLight rounded-md shadow-xl">
               <Chart
                  name={'Universals'}
                  data={universals.data}
                  categories={universals.categories}
               />
            </div>
            <div className="w-1/2 p-1 ml-2 h-auto bg-bgLight rounded-md shadow-xl">
               <ChartDetall
                  name={'Universals'}
                  data={universalsDetall}
                  objectius={plotMatma}
               />
            </div>
         </section>
         <div className="flex flex-row justify-between mx-2 mb-2">
            <div className="w-1/2 p-1 mr-2 bg-bgLight rounded-md shadow-xl">
               <h1 className="text-center text-xl font-bold my-4">DMA</h1>
            </div>
         </div>
      </article>
   );
}
