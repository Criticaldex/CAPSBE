import { getSections } from "@/services/professionals";
import { GetLinksSection } from "../../routing";

export default async function ProfessionalsCenter({ children, params }: any) {
   const { center } = params;
   const sections = await getSections(center, process.env.PROFESSIONALS_DEFAULT_YEAR)

   return (
      <div>
         <GetLinksSection
            sections={sections}
         />
         {children}
      </div>
   )
}