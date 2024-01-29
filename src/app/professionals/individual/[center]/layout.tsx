import { GetLinksCentro, GetLinksSection, GetLinksView, GetLinksYears } from "@/app/professionals/individual/routing";
import { getCenters } from "@/services/centros";
import { getSections, getYears } from "@/services/professionals";

export default async function ProfessionalsCenter({ children, params }: any) {
   const { center, year } = params;
   let filters = { 'any': year, 'centre': center }
   const sections = await getSections(filters)
   const centros = await getCenters();
   const years = await getYears();

   return (
      <div className="mt-2 bg-light flex-col items-center">
         <div className="flex justify-between grow mb-2 mx-2">
            <div className="flex justify-start grow">
               <GetLinksView />
               <GetLinksCentro
                  centros={centros}
               />
               <GetLinksSection
                  sections={sections}
               />
               <GetLinksYears
                  years={years}
               />
            </div>
            <div className="bg-light text-right flex items-center">
               <h1 className="mx-10 font-semibold text-2xl italic">Professionals</h1>
            </div>
         </div>
         {children}
      </div>
   )
}