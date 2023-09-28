import { GetLinksYears } from "@/app/professionals/routing";
import { getYears } from "@/services/professionals";

export default async function ProfessionalsCenter({ children, params }: any) {

   return (
      <div>
         {children}
      </div>
   )
}