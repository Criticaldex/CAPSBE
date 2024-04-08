import { getOrdresIndicators } from "@/services/ordres";
import OrdresTable from "./table";
import { getCenters } from "@/services/centros";

export default async function OrdresYear({ params }: { params: any }) {
   const { year } = params
   const centros = await getCenters();


   const filter = { "any": year };
   const indicadores = await getOrdresIndicators(filter);

   return (
      <section className="w-full h-screen m-auto flex justify-center mt-10">
         <article className="w-2/3 h-3/4 overflow-auto rounded-lg scrollable">
            <OrdresTable
               data={indicadores}
               centros={centros}
            />

         </article>
      </section>
   )
}