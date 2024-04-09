// 'use client'
import { AdminTable } from "./Table";
import { getYears, getTableInversions } from "@/services/inversions";
import { getCenters } from "@/services/centros";
import { getSession } from "@/services/session";

import * as React from 'react';
import Demo from './Demo';

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