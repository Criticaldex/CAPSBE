import { Chart } from './chart'
import { getChartIndicators } from "../../../services/contracts";
import { getContractsCenters } from "../../../services/centros";

export default async function ContractsChart({ params }: any) {
   const { year, center } = params;
   const centros = await getContractsCenters(year);
   const infoChart = await getChartIndicators({ "Any": year, "Centre": center });

   return (
      <Chart
         name={centros[center].name}
         data={infoChart}
      />
   )
}