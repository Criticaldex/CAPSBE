import _ from "lodash"
import { getSession } from "@/services/session"


const getContracts = async (filter: any) => {
   const session = await getSession();

   return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contracts`,
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

export const updateContracts = async (data: any) => {
   const session = await getSession();
   data.dbName = session?.user.db;
   return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contracts`,
      {
         method: 'PATCH',
         headers: {
            'Content-type': 'application/json',
         },
         body: JSON.stringify(data),
      }).then(res => res.json());
}

export const getChartIndicators = async (year: string, center: string) => {
   const filter = { "any": year, "centre": center };
   const data = await getContracts(filter);

   return data.map((i: any) => {
      return {
         name: i.identificador,
         data: i.resultat
      }
   })
}

export const getTableIndicators = async (year: string) => {
   const data = await getContracts({ "any": year });
   return _.groupBy(data, 'indicador');
}

export const getYears = async () => {
   const data = await getContracts({});
   const yearsGroup = _.groupBy(data, 'any');
   let years: string[] = []
   for (const [key, value] of (Object.entries(yearsGroup) as [string, any][])) {
      years.push(key);
   }
   return years;
}