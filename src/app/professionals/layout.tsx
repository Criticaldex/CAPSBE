import React from "react";

export default async function ProfessionalsLayout({ children }: any) {

   return (
      <div>
         <title>Professionals</title>
         <main className="m-2">
            {children}
         </main>
      </div>
   )
}
