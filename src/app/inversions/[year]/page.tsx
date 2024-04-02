import { getAdminTable } from "@/services/indicators";
import { AdminTable } from "./table";
import { getYears, getTableInversions } from "@/services/inversions";
import { getCenters } from "@/services/centros";
import { getSession } from "@/services/session";

export default async function AdminDashboard({ params }: any) {
   const { year } = params;
   const session = await getSession();
   const centros = await getCenters();
   const years = await getYears();
   const filtro = { any: year };

   const indicadores = await getTableInversions(filtro);

   return (
      <div className="flex flex-col">
         <AdminTable
            data={indicadores}
            session={session}
         />
      </div>
   )
}