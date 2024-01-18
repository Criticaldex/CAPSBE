import { getAdminTable, getYears } from "@/services/professionals";
import { AdminTable } from "./table";
import { getCenters } from "@/services/centros";
import { getSections } from "@/services/professionals";

export default async function AdminDashboard({ params }: any) {
   const { year, sector } = params;
   let filters = { 'any': year }
   const centros = await getCenters();
   const years = await getYears();
   const sections = await getSections(filters);

   const professionals = await getAdminTable(year, sector.replaceAll('_', ' '), centros);

   return (
      <div className="flex flex-col">
         <AdminTable
            data={professionals}
            centers={centros}
            years={years}
            sections={sections}
         />
      </div >
   )
}