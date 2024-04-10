import { AdminTable } from "./Table";
import { getTableInversions } from "@/services/inversions";
import { getSession } from "@/services/session";

import * as React from 'react';

export default async function InversioPage({ params }: any) {
   const { year } = params;
   const session = await getSession();
   let filtro: any = { any: year };
   if (session?.user.role == '2') {
      filtro = {
         any: year,
         centre: session.user.centre
      }
   };

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