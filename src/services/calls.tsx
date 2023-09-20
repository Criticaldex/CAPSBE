import _ from "lodash"
import { getSession } from "@/services/session"

const getCalls = async (filter: any) => {
   const session = await getSession();

   return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/calls`,
      {
         method: 'POST',
         headers: {
            'Content-type': 'application/json',
         },
         body: JSON.stringify(
            {
               db: session?.user.db,
               fields: [
                  "any",
                  "mes",
                  "dia",
                  "centre",
                  "abandoned",
                  "offered",
                  "answered",
                  "overflowed",
                  "answered_time",
                  "abandoned_time",
                  "-_id"
               ],
               filter: filter,
            }
         ),
      }).then(res => res.json());
}

export const getCallsToday = async (center: string) => {
   const pad = '00';
   const day = (pad + (new Date().getDate() - 1)).slice(-pad.length);
   const month = (pad + (new Date().getMonth() + 1)).slice(-pad.length);
   const year = new Date().getFullYear().toString();

   const filter = { "centro": center, "any": year, "mes": month, "dia": day };
   return await getCalls(filter);

   // return data.map((i: any) => {
   //    return {
   //       name: i.identificador,
   //       data: i.resultat
   //    }
   // })
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
   const data = await getCalls(filter);
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
   const data = await getCalls(filter);
   return _.groupBy(data, 'identificador');
}

export const getYears = async () => {
   const data = await getCalls({});
   const yearsGroup = _.groupBy(data, 'any');
   let years: string[] = []
   for (const [key, value] of (Object.entries(yearsGroup) as [string, any][])) {
      years.push(key);
   }
   return years;
}