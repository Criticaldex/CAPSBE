import _ from "lodash"
import { getSession } from "@/services/session"
import { getUser } from "@/services/users"
import { IndicatorIface } from "@/schemas/indicator";

const getIndicators = async (filter: any, db?: string) => {
   if (!db) {
      const session = await getSession();
      db = session?.user.db;
   }

   return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/indicators`,
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

export const updateIndicators = async (data: any) => {
   return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/indicators`,
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
   const data = await getIndicators(filter);

   return data.map((i: any) => {
      return {
         name: i.identificador,
         data: i.resultat
      }
   })
}

export const getTableIndicators = async (year: string, section: string) => {
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

   const data = await getIndicators(filter);
   data.map((indicador: any) => {
      indicador.ordre = parseFloat(session?.user.configs.dashboard[indicador.codi].ordre);
   });
   const orderData = _.sortBy(data, 'ordre');
   return _.groupBy(orderData, 'codi');
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

export const getAdminTable = async (year: string, centros: any, email: any, db?: string) => {
   const filter: any = {
      any: year
   };

   const data = await getIndicators(filter, db);
   const indicadors = _.groupBy(data, 'codi');
   const user = await getUser(email);
   let tableData: any = [];

   for (const [key, value] of (Object.entries(indicadors) as [string, any][])) {

      let indicador: IndicatorIface = value[0] ? value[0] : null;
      indicador.grup = user.configs?.dashboard[key]?.grup;
      indicador.ordre = user.configs?.dashboard[key]?.ordre;
      indicador.configs = user.configs;

      indicador.objectius = {};

      value.forEach((val: any) => {
         centros.forEach((centro: { name: string | number; id: string | number; }, i: any) => {
            if (val.centre == centro.id) {
               indicador.objectius[centro.name] = (typeof (val.objectiu) != "undefined") ? val.objectiu : null;
            }
         });
      });
      tableData.push(indicador);
   }
   return tableData;
}