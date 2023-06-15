import React from "react";

export default async function loadProfesionals({ children, params }: any) {

   const { view } = params;
   return (
      <div className="bg-green-600">
         <h1>!!!!!!VISTA {view} !!!!!</h1>
         {children}
      </div>
   )
}
