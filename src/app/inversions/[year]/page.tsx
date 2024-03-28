import { getAdminTable } from "@/services/indicators";
import { AdminTable } from "./table";
import { getYears } from "@/services/inversions";
import { getCenters } from "@/services/centros";
import { getSession } from "@/services/session";

export default async function AdminDashboard({ params }: any) {
   const { year } = params;
   const session = await getSession();
   const centros = await getCenters();
   const years = await getYears();

   const indicadores = await getAdminTable(year, centros, session?.user.email);

   return (
      <div className="flex flex-col">
         <AdminTable
         // data={indicadores}
         // centers={centros}
         // years={years}
         // session={session}
         />
      </div>
   )
}