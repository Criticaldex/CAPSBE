import { getHiper } from "@/services/iqfs";
import { ChartContainer } from "./chartContainer"
import { getCenters } from "@/services/centros";


export default async function HiperPage({ year }: any) {
   const centros = await getCenters();
   const hiper = await getHiper(year, centros);

   return (
      <ChartContainer
         year={year}
         centros={centros}
         hiper={hiper}
      />
   );
}
