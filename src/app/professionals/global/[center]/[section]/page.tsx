import { getChartIndicators, getIndicators, getProfessionalsList, getTableIndicators } from "@/services/professionals";
import { Chart } from "./chart";
import { ProfessionalsTable } from "./table";

export default async function ProfessionalsChart({ params }: any) {
   const { center, section } = params;

   const date = new Date();
   let year = date.getFullYear().toString();
   let filters = (center == 'all') ? { 'any': year, 'sector': section.replaceAll('_', ' ') } : { 'any': year, 'centre': center, 'sector': section.replaceAll('_', ' ') }
   const indicadors = await getIndicators(filters);
   const infoChart = await getChartIndicators(filters);
   const infoTable = await getTableIndicators(filters);
   const professionals = await getProfessionalsList(filters);

   return (
      <div>
         <Chart
            name={'maig 2023'}
            data={infoChart}
            index={indicadors}
            objectiu={50}
         />
         <ProfessionalsTable
            data={infoTable}
            professionals={professionals}
         />
      </div>
   )
}