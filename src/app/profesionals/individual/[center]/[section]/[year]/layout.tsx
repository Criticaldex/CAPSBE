import { GetLinksProfesionals } from "@/app/profesionals/routing";
import { getProfesionalsList } from "@/services/profesionals";

export default async function ProfesionalsChart({ children, params }: any) {
   const { center, section, year } = params;
   let filters = (center == 'all') ? { 'any': year, 'sector': section.replaceAll('_', ' ') } : { 'any': year, 'centre': center, 'sector': section.replaceAll('_', ' ') }
   const profesionals = await getProfesionalsList(filters);

   return (
      <div className="flex pr-2">
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