import { GetLinksProfesionals, GetLinksYears } from "@/app/profesionals/routing";
import { getProfesionals } from "@/services/profesionals";

export default async function ProfesionalsChart({ children, params }: any) {
   const { center, section, year } = params;
   let filters = (center == 'all') ? { 'any': year, 'sector': section.replaceAll('_', ' ') } : { 'any': year, 'centre': center, 'sector': section.replaceAll('_', ' ') }
   const profesionals = await getProfesionals(filters);

   return (
      <div className="flex">
         <div className="w-1/4">
            <GetLinksProfesionals
               profesionals={profesionals}
            />
         </div>
         <div className="w-3/4">
            {children}
         </div>
      </div>
   )
}