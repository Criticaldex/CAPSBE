import _ from "lodash"
import { getSession } from "@/services/session"

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

export const getTableInversions = async (filter: any) => {
   return await getInversions(filter);
}

export const getYears = async () => {
   const data = await getInversions({});
   const yearsGroup = _.groupBy(data, 'any');
   let years: string[] = []
   for (const [key, value] of (Object.entries(yearsGroup) as [string, any][])) {
      years.push(key);
   }
   return years;
}