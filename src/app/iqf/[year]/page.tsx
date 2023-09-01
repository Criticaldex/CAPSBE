import { getCenters } from "@/services/centros";
import { getEqasContracts } from "@/services/eqas";
import { Chart } from "./chart";
import { ChartDetail } from "./chartDetail";
import { getPlotLines, getUniversals, getUniversalsDetall, getHiper, getSeleccio, getHiperDetall, getSeleccioDetall } from "@/services/iqfs";
import { getSession } from "@/services/session";

export default async function LayoutDashboard({ children, params }: any) {
   const { year } = params;
   let seccioUni = 'matma';
   let seccioHiper = 'aines';
   let seccioSele = 'mpoc_seleccio';
   const session = await getSession();
   const centros = await getCenters();
   const eqas = await getEqasContracts(year, centros);
   const universals = await getUniversals(year, centros);
   const hiper = await getHiper(year, centros);
   const seleccio = await getSeleccio(year, centros);
   const universalsDetall = await getUniversalsDetall(year, centros, seccioUni);
   const hiperDetall = await getHiperDetall(year, centros, seccioHiper);
   const seleccioDetall = await getSeleccioDetall(year, centros, seccioSele);
   const plotMatma = await getPlotLines(seccioUni)
   const plotHiper = await getPlotLines(seccioHiper)
   const plotSele = await getPlotLines(seccioSele)

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
