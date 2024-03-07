import _ from "lodash"
import { getSession } from "@/services/session";
import { AccessibilitatIface } from "@/schemas/accessibilitat";
import { getCenters } from "./centros";
import { getMitjaSetmanal } from "./demoras";

const getAccessibilitats = async (filter: any, sort?: string, db?: string) => {
   if (!db) {
      const session = await getSession();
      db = session?.user.db;
   }

   return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/accessibilitats`,
      {
         method: 'POST',
         headers: {
            'Content-type': 'application/json',
         },
         body: JSON.stringify(
            {
               db: db,
               fields: [
                  "-_id"
               ],
               filter: filter,
               sort: sort
            }
         ),
      }).then(res => res.json());
}

export const getCardAccessibilitats = async (filter: any) => {
   const data = await getAccessibilitats(filter);
   const mitjaSetDemora = await getMitjaSetmanal();
   const centres = await getCenters();
   const centreGroup = _.groupBy(data, 'centre');

   let cards: any = {}

   centres.forEach((centre: { id: string, name: string, up: string }) => {
      let card: any = {
         name: centre.name,
         demoraSetmanal: mitjaSetDemora[centre.id].toFixed(2),
      }

      centreGroup[centre.id].map((identificador: any) => {
         card[identificador.identificador] = identificador.resultat[identificador.resultat.length - 1]
      })
      cards[centre.id] = card;
   });
   return cards;
}

export const getChartAccessibilitats = async (filter: any, db?: string) => {
   const sort = 'identificador';
   filter = {
      ...filter,
      identificador: {
         $in: [
            "ACC5DF_EAP_AC",
            "ACC5DF_INF",
            "ACC5DF_MF",
            "ACC5DF_PED"
         ]
      }
   }
   const data = await getAccessibilitats(filter, sort, db);

   let chartData: any = [];

   data.forEach((indi: AccessibilitatIface) => {
      chartData.push({
         type: 'spline',
         name: indi.identificador,
         data: indi.resultat
      });
   });
   return chartData;
}

export const getLastYear = async () => {
   const data = await getAccessibilitats({});
   const yearsGroup = _.groupBy(data, 'any');
   let years: string[] = Object.keys(yearsGroup);
   return years[years.length - 1];
}