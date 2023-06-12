import { Chart } from './chart'
import { getMongoData, getChartIndicators, getCleanCenters } from "../../../services/contracts";

export default async function ContractsChart({ params }: any) {
   const { year, center } = params;
   const centros = await getCleanCenters(year);
   const infoChart = await getChartIndicators({ "Any": year, "Centre": center });

   return (
      <Chart
         name={centros[center].name}
         data={infoChart}
      />
   )
}