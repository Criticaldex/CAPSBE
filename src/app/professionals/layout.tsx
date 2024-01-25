import React from "react";
import { getCenters } from "@/services/centros"
import { GetLinksView, GetLinksCentro, GetLinksYears, GetLinksSection } from "./routing"
import { getSections, getYears } from "@/services/professionals";

export default async function ProfessionalsLayout({ children, params }: any) {
   const { center } = params;
   let filters = { 'any': process.env.DEFAULT_YEAR, 'centre': center }
   const centros = await getCenters();
   const years = await getYears();
   const sections = await getSections(filters);

   return (
      <div>
         <title>Professionals</title>
         <main className="m-2">
            {children}
         </main>
      </div>
   )
}
