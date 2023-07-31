import { GetLinksAdmin } from "./routing";
import { getYears } from "@/services/contracts";

export default async function ContractsLayout({ children }: any) {
   const years = await getYears();
   return (
      <div>
         {children}
      </div>
   )
}