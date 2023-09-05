import { getSeleccio } from "@/services/iqfs";
import { ChartContainer } from "./chartContainer"
import { getCenters } from "@/services/centros";


export default async function SeleccioPage({ year }: any) {
   const centros = await getCenters();
   const seleccio = await getSeleccio(year, centros);

   return (
      <ChartContainer
         year={year}
         centros={centros}
         seleccio={seleccio}
      />
   );
}
