import { GetLinksYears } from "@/app/profesionals/routing";
import { getYears } from "@/app/services/profesionals";

export default async function ProfesionalsChart({ children, params }: any) {
   const { center, section } = params;
   const years = await getYears(center, section);

   return (
      <div>
         <GetLinksYears
            years={years}
         />
         {children}
      </div>
   )
}