import React from "react";

export default async function loadProfessionals({ children, params }: any) {

   const { view } = params;
   return (
      <section>
         {children}
      </section>
   )
}
