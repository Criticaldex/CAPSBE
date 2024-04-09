import { AdminTable } from "./Table";
import { getTableInversions } from "@/services/inversions";
import { getSession } from "@/services/session";

import * as React from 'react';

export default async function AdminDashboard({ params }: any) {
   const { year } = params;
   const session = await getSession();
   const filtro = { any: year };

   const indicadores = await getTableInversions(filtro);
   return (
      <div className="flex flex-col">
         <AdminTable
            data={indicadores}
            session={session}
            year={year}
         />
      </div >
   )
}