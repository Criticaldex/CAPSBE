import _ from "lodash"
import { getSession } from "@/services/session"

const getIndicators = async (filter: any) => {
   const session = await getSession();

   return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/indicators`,
      {
         method: 'POST',
         headers: {
            'Content-type': 'application/json',
         },
         body: JSON.stringify(
            {
               db: session?.user.db,
               fields: [
                  "identificador",
                  "indicador",
                  "resultat",
                  "any",
                  "centre",
                  "objectiu",
                  "invers",
                  "-_id"
               ],
               filter: filter,
            }
         ),
      }).then(res => res.json());
}

export const getChartIndicators = async (year: string, center: string) => {
   const filter = { "any": year, "centre": center };
   const data = await getIndicators(filter);

   return data.map((i: any) => {
      return {
         name: i.identificador,
         data: i.resultat
      }
   })
}

export const getTableIndicatorsNoCpr = async (year: string) => {
   const filter: any = {
      identificador: {
         $nin: [
            "GESTINF05",
            "PLA006",
            "POBATINF01",
            "CRONICITAT_RES",
            "GC0005",
            "NUT01",
            "FIS01",
            "BEN01",
            "BENRES01",
            "EQA0208"
         ]
      },
      any: year
   };
   const data = await getIndicators(filter);
   return _.groupBy(data, 'identificador');
}

export const getTableIndicatorsCpr = async (year: string) => {
   const filter: any = {
      identificador: {
         $in: [
            "GESTINF05",
            "PLA006",
            "POBATINF01",
            "CRONICITAT_RES",
            "GC0005",
            "NUT01",
            "FIS01",
            "BEN01",
            "BENRES01",
            "EQA0208"
         ]
      },
      any: year
   };
   const data = await getIndicators(filter);
   return _.groupBy(data, 'identificador');
}

export const getYears = async () => {
   const data = await getIndicators({});
   const yearsGroup = _.groupBy(data, 'any');
   let years: string[] = []
   for (const [key, value] of (Object.entries(yearsGroup) as [string, any][])) {
      years.push(key);
   }
   return years;
}