import { getChartIndicators, getTableIndicators } from "@/app/services/profesionals";
import { Chart } from "./chart";
import { ProfesionalsTable } from "./table";

export default async function ProfesionalsChart({ params }: any) {
   const { center, section } = params;

   const date = new Date();;
   let year = date.getFullYear().toString();
   let filters = (center == 'all') ? { 'any': year, 'sector': section.replaceAll('_', ' ') } : { 'any': year, 'centre': center, 'sector': section.replaceAll('_', ' ') }
   // const infoChart = await getChartIndicators(center, section.replaceAll('_', ' '), year);
   const infoTable = await getTableIndicators(filters);
   const profesionals = _.groupBy(infoTable, 'Indicador');
   console.log('infoTable: ', infoTable);

   return (
      <div>
         <h1 className="bg-blue-600">!!!!!!SECTION {center} / {section}!!!!!</h1>
         {/* <Chart
            name={centros[center].name}
            data={infoChart}
         /> */}
         <ProfesionalsTable
            data={infoTable}
            profesionals={profesionals}
         />
      </div>
   )
}