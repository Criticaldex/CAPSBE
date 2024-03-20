import _ from "lodash"
import { getSession } from "@/services/session"
import { getUser } from "@/services/users"
import { IndicatorIface } from "@/schemas/indicator";

const getInversions = async (filter: any, db?: string) => {
   if (!db) {
      const session = await getSession();
      db = session?.user.db;
   }

   return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/inversions`,
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
               sort: 'ordre'
            }
         ),
      }).then(res => res.json());
}

export const updateInversions = async (data: any) => {
   return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/indicators`,
      {
         method: 'PATCH',
         headers: {
            'Content-type': 'application/json',
         },
         body: JSON.stringify(data),
      }).then(res => res.json());
}

export const getTableInversions = async (year: string, section: string) => {
   const session = await getSession();
   let codis = [];
   for (const [key, value] of (Object.entries(session?.user.configs.dashboard) as [string, any][])) {
      if (section == value.grup) {
         codis.push(key);
      }
   }

   const filter: any = {
      codi: {
         $in: codis
      },
      any: year
   };

   const data = await getInversions(filter);
   data.map((indicador: any) => {
      indicador.ordre = parseFloat(session?.user.configs.dashboard[indicador.codi].ordre);
   });
   const orderData = _.sortBy(data, 'ordre');
   return _.groupBy(orderData, 'codi');
}

export const getYears = async () => {
   const data = await getInversions({});
   const yearsGroup = _.groupBy(data, 'year');
   let years: string[] = []
   for (const [key, value] of (Object.entries(yearsGroup) as [string, any][])) {
      years.push(key);
   }
   return years;
}