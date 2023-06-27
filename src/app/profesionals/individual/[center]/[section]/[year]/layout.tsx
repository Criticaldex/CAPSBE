import { GetLinksProfesionals, GetLinksYears } from "@/app/profesionals/routing";
import { getProfesionals } from "@/app/services/profesionals";

export default async function ProfesionalsChart({ children, params }: any) {
   const { center, section, year } = params;
   let filters = (center == 'all') ? { 'any': year, 'sector': section.replaceAll('_', ' ') } : { 'any': year, 'centre': center, 'sector': section.replaceAll('_', ' ') }
   const profesionals = await getProfesionals(filters);

   return (
      <div className="bg-green-500">
         <GetLinksProfesionals
            profesionals={profesionals}
         />
         {children}
      </div>
   )
}