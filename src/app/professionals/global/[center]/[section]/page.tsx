import { getChartIndicators, getIndicators, getMonth, getProfessionalsList, getSubTableIndicators, getTableIndicators } from "@/services/professionals";
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
   const monthName = await getMonth(filters)

   const indicadorsNames = indicadors.map((ind: any) => ind.name)
   const indicadorsObj = indicadors.map((ind: any) => ind.obj)

   return (
      <div>
         <div className="mb-2">
            <Chart
               name={monthName + ' ' + year}
               data={infoChart}
               index={indicadorsNames}
               objectius={indicadorsObj}
            />
         </div>
         <ProfessionalsTable
            data={infoTable}
            professionals={professionals}
         />
      </div>
   )
}