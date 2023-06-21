import { getChartIndicators, getIndicators, getProfesionals, getTableIndicators } from "@/app/services/profesionals";
import { Chart } from "./chart";
import { ProfesionalsTable } from "./table";

export default async function ProfesionalsChart({ params }: any) {
   const { center, section } = params;

   const date = new Date();;
   let year = date.getFullYear().toString();
   let filters = (center == 'all') ? { 'any': year, 'sector': section.replaceAll('_', ' ') } : { 'any': year, 'centre': center, 'sector': section.replaceAll('_', ' ') }
   const indicadors = await getIndicators(filters);
   const infoChart = await getChartIndicators(filters);
   const infoTable = await getTableIndicators(filters);
   const profesionals = await getProfesionals(filters);

   return (
      <div className="px-6">
         <Chart
            name={'maig 2023'}
            data={infoChart}
            index={indicadors}
            objectiu={50}
         />
         <ProfesionalsTable
            data={infoTable}
            profesionals={profesionals}
         />
      </div>
   )
}