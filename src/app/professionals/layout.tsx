import React from "react";
import { getCenters } from "@/services/centros"
import { GetLinksView, GetLinksCentro, GetCenter } from "./routing"

export default async function ProfessionalsLayout({ children }: any) {
   const centros = await getCenters();

   return (
      <div>
         <title>Professionals</title>
         <div className="h-20 bg-white bg-opacity-10 text-right flex justify-end items-center">
            <GetCenter
               centros={centros}
            />
         </div>
         <hr className="w-11/12 m-auto mt-0 border-t-2 border-darkBlue" />
         <div className="flex justify-start absolute top-5 pl-10">
            <GetLinksCentro
               centros={centros}
            />
            <GetLinksView />
         </div>
         <main className="">
            {children}
         </main>
      </div>
   )
}
