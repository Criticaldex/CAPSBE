import { Chart } from './chart'
import { getChartIndicators } from "@/services/contracts";
import { getCenters } from "@/services/centros";

export default async function ContractsChart({ params }: any) {
   const { year, center } = params;
   const centros = await getCenters(year);
   const infoChart = await getChartIndicators(year, center);

   return (
      <Chart
         name={centros[center].name}
         data={infoChart}
      />
   )
}