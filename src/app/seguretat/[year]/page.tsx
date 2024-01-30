import { getCenters } from "@/services/centros";
import { GeriatriaContainer } from "./geriatriaContainer"
import { SncContainer } from "./sncContainer";
import { Totals } from "./totals";
import { getGeriatria, getTotalsSeguretat } from "@/services/seguretats";
import { getUniversals, getTotalsIqf, getUniversalsDetall } from "@/services/iqfs";

export default async function Seguretat({ params }: any) {
   const { year } = params
   const centros = await getCenters();
   const geriatria = await getGeriatria(year, centros);
   const universalsDetall = await getUniversalsDetall(year, centros, 'matma');
   const iqfTotals = await getTotalsIqf(year, centros);

   return (
      <div className="min-h-fit">
         <Totals
            iqfTotals={iqfTotals}
         />
         <GeriatriaContainer
            year={year}
            centros={centros}
            geriatria={geriatria}
         />
         {/* <SncContainer
            year={year}
            centros={centros}
            hiper={hiper}
         /> */}
      </div>
   );
}
