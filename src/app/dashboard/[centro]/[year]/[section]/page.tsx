import { getTableIndicators } from "@/services/indicators";
import { DashboardTable } from "./table"
import { getCenters } from "@/services/centros";

export default async function Contracts({ params }: any) {
   const { year, section } = params;
   const centros = await getCenters();
   const indicadores = await getTableIndicators(year, section);

   return (
      <DashboardTable
         data={indicadores}
         centros={centros}
      />
   )
}