import React from "react";
import { getProfesionalsCenters } from "../services/centros"
import { GetLinksView, GetLinksCentro } from "./routing"

export default async function ProfesionalsLayout({ children }: any) {
   const centros = await getProfesionalsCenters();

   return (
      <div>
         <title>Profesionals</title>
         <div className="h-20 bg-white bg-opacity-40 text-right flex justify-end items-center">
            <h1 className="right-0 w-auto mr-10 font-semibold text-2xl italic">Professionals</h1>
         </div>
         <hr className="w-11/12 m-auto mt-0 border-t-2" />
         <div className="w-full flex justify-start absolute top-5 pl-10">
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
