import { getCentre, getChartIndividual, getProfesionals, getTableIndicators } from "@/app/services/profesionals";
import { getProfesionalsCenters } from "@/app/services/centros";
import { Chart } from "./chart";
import { ProfesionalsTable } from "./table";

async function profesionalName(profesionals: string[], profesional: string) {
   for (let index = 0; index < profesionals.length; index++) {
      if (profesionals[index].includes(profesional)) {
         return profesionals[index];
      }
   }
}

async function centerName(profesional: string) {
   const centreProf = await getCentre(profesional);
   const centres = await getProfesionalsCenters();

   for (let index = 0; index < centres.length; index++) {
      if (centres[index].id == centreProf) {
         return centres[index].name;
      }
   }
}

export default async function ProfesionalsChart({ params }: any) {
   const { center, section, year, profesional } = params;

   let filters = (center == 'all') ? { 'any': year, 'sector': section.replaceAll('_', ' ') } : { 'any': year, 'centre': center, 'sector': section.replaceAll('_', ' ') }
   const profesionals = await getProfesionals(filters);
   const infoChart = await getChartIndividual(filters, profesional);
   //const infoTable = await getTableIndividual(filters);
   const infoTable = await getTableIndicators(filters);

   let profName = await profesionalName(profesionals, profesional);
   const chartName = await profesionalName(profesionals, profesional) + ' - ' + await centerName(profesional);


   return (
      <div>
         <Chart
            name={chartName}
            data={infoChart}
         />
         <ProfesionalsTable
            data={infoTable}
            profesionals={profesionals}
            profesional={profName}
         />
      </div>
   )
}