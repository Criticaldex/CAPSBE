import { GetLinksProfessionals } from "@/app/professionals/routing";
import { getProfessionalsList } from "@/services/professionals";

export default async function ProfessionalsChart({ children, params }: any) {
   const { center, section, year } = params;
   let filters = (center == 'all') ? { 'any': year, 'sector': section.replaceAll('_', ' ') } : { 'any': year, 'centre': center, 'sector': section.replaceAll('_', ' ') }
   const professionals = await getProfessionalsList(filters);

   return (
      <div className="flex pr-2">
         <div className="w-1/4">
            <GetLinksProfessionals
               professionals={professionals}
            />
         </div>
         <div className="w-3/4">
            {children}
         </div>
      </div>
   )
}