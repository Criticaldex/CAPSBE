import { getChartAccessibilitats, getLastYear } from "@/services/accessibilitat";
import { AccessibilitatChart } from "./accessibilitatChart";
import { getCenters } from "@/services/centros";

export default async function Accessibilitat({ params }: any) {
   const { center } = params;
   const centers = await getCenters();
   const lastYear = await getLastYear();
   const chartData = await getChartAccessibilitats({
      centre: center,
      any: lastYear
   });

   return (
      <div className="bg-bgLight rounded-md p-3 mb-2">
         <title>Accessibilitat i Demora</title>
         <AccessibilitatChart
            name={centers[center].name}
            data={chartData}
         />
      </div>
   );
}