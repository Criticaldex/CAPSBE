import { getAdminTable } from "@/services/indicators";
import { AdminTable } from "./table"
import { getCenters } from "@/services/centros";

export default async function AdminDashboard({ params }: any) {
   const { year, centro } = params;
   let up: string = '';
   let nameCentro: string = '';
   const centros = await getCenters();
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
         />
      </div >
   )
}