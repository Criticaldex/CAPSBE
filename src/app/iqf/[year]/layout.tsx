import { getCenters } from "@/services/centros";
import { Totals } from "./totals";
import { getTotalsIqf } from "@/services/iqfs";

export default async function LayoutDashboard({ children, hiper, seleccio, universals, params }: any) {
   const { year } = params
   const centros = await getCenters();

   const iqfTotals = await getTotalsIqf(year, centros);


   return (
      <article className="min-h-fit">
         <div className="w-full mb-1 rounded-md px-2">
            <Totals
               iqfTotals={iqfTotals}
            />
         </div>
         {children}
         {universals}
         {hiper}
         {seleccio}
      </article>
   );
}
