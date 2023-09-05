import { getUniversals } from "@/services/iqfs";
import { ChartContainer } from "./chartContainer"
import { getCenters } from "@/services/centros";


export default async function UniversalsPage({ year }: any) {
   const centros = await getCenters();
   const universals = await getUniversals(year, centros);

   return (
      <ChartContainer
         year={year}
         centros={centros}
         universals={universals}
      />
   );
}
