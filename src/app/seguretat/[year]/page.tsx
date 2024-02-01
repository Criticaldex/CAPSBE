import { getCenters } from "@/services/centros";
import { GeriatriaContainer } from "./geriatriaContainer"
import { SncContainer } from "./sncContainer";
import { Totals } from "./totals";
import { getGeriatria, getTotalsSeguretat, getGeriatriaDetall, getSnc } from "@/services/seguretats";
import { getUniversalsDetall, getUniversals } from "@/services/iqfs";

export default async function Seguretat({ params }: any) {
   const { year } = params
   const centros = await getCenters();
   const geriatria = await getGeriatria(year, centros);
   const snc = await getSnc(year, centros);
   const universals = await getUniversals(year, centros);
   const seguretatTotals = await getTotalsSeguretat(year, centros);
   const UniversalsDetall = await getUniversalsDetall(year, centros, 'Matma');
   const geriatriaDetall = await getGeriatriaDetall(year, centros, 'Medicaments potencialment inapropiats en Geriatria');

   return (
      <div className="min-h-fit">
         <Totals
            seguretatTotals={seguretatTotals}
         />
         <GeriatriaContainer
            year={year}
            centros={centros}
            geriatria={geriatria}
         />
         <SncContainer
            year={year}
            centros={centros}
            snc={snc}
         />
      </div>
   );
}
