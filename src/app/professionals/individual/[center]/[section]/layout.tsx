import { GetLinksYears } from "@/app/professionals/routing";
import { getYears } from "@/services/professionals";

export default async function ProfessionalsCenter({ children, params }: any) {
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