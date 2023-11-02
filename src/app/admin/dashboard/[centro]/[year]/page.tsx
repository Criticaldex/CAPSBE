import { getAdminTable } from "@/services/indicators";
import { AdminTable } from "./table"
import { getYears } from "@/services/contracts";
import { getCenters } from "@/services/centros"

export default async function AdminDashboard({ params }: any) {
   const { year, centro } = params;
   let up: string = '';
   let nameCentro: string = '';
   const centros = await getCenters();
   const years = await getYears();
   centros.map((center: any) => {
      if (center.id == centro) {
         up = center.up
         nameCentro = center.name
      }
   })

   const indicadores = await getAdminTable(year, centro);

   return (
      <div className="flex flex-col">
         <AdminTable
            data={indicadores}
            centers={centros}
            years={years}
         />
      </div >
   )
}