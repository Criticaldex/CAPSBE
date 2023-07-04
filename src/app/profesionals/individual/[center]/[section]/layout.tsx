import { GetLinksYears } from "@/app/profesionals/routing";
import { getYears } from "@/services/profesionals";

export default async function ProfesionalsCenter({ children, params }: any) {
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