import { GetLinksSection } from "@/app/professionals/routing";
import { getSections } from "@/services/professionals";

export default async function ProfessionalsCenter({ children, params }: any) {
   const { center } = params;
   let filters = { 'any': process.env.DEFAULT_YEAR, 'centre': center }
   const sections = await getSections(filters)

   return (
      <div className="">
         <div className="grow mb-2 text-center">
            <GetLinksSection
               sections={sections}
            />
         </div>
         {children}
      </div>
   )
}