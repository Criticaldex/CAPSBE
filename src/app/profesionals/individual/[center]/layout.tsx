import { getSections } from "@/app/services/profesionals";
import { GetLinksSection } from "../../routing";

export default async function ProfesionalsCenter({ children, params }: any) {
   const { center } = params;
   const sections = await getSections(center, process.env.PROFESIONALS_DEFAULT_YEAR)

   return (
      <div>
         <GetLinksSection
            sections={sections}
         />
         {children}
      </div>
   )
}