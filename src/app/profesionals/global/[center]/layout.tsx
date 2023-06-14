import { getSections } from "@/app/services/profesionals";
import { GetLinksSection } from "../../routing";

export default async function ProfesionalsCenter({ children, params }: any) {
   const { view, center } = params;
   const sections = await getSections(center, process.env.PROFESIONALS_DEFAULT_YEAR)

   return (
      <div className="bg-red-600">
         <h1>!!!!!!CENTRO {view} / {center} !!!!!</h1>
         <GetLinksSection
            sections={sections}
         />
         {children}
      </div>
   )
}