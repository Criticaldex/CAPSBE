import { getCenters } from "@/services/centros";
import { CardsAccessibilitat } from "./accessibilitatCard";
import { getCardAccessibilitats } from "@/services/accessibilitat";

export default async function ContractsLayout({ children, params }: any) {
   const { year } = params;
   const filter = { any: year }
   const centers = await getCenters();
   const accessibilitats = await getCardAccessibilitats(filter);

   return (
      <div>
         <title>Accessibilitat i Demora</title>
         <div className="flex justify-around mb-2">
            {centers.map((centro: any) => {
               return <CardsAccessibilitat
                  accessibilitats={accessibilitats[centro.id]}
                  key={centro}
               />
            })}
         </div>
         {children}
      </div>
   )
}