import React from "react";

export default async function loadProfesionals({ children, params }: any) {

   const { view } = params;
   return (
      <div>
         {children}
      </div>
   )
}
