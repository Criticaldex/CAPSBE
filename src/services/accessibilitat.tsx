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
   const sort = 'dia'
   const data = await getAccessibilitats(filter, sort, db);
   const daysGroup = _.groupBy(data, 'dia');
   const sectorGroup = _.groupBy(data, 'sector');
   const sectors = _.orderBy(Object.keys(sectorGroup), 'desc');

   let chartData: any = [];

   sectors.forEach((sector, i) => {
      chartData.push({
         type: 'spline',
         name: sector,
         data: []
      });

      for (const [dia, sectorsDia] of (Object.entries(daysGroup) as [string, any][])) {
         sectorsDia.map((sec: any) => {
            if (sec.sector == sector) {
               let mitjanaSuma: number = 0;
               let numProf: number = Object.keys(sec.professionals).length;
               for (const [k, val] of (Object.entries(sec.professionals) as [string, any][])) {
                  mitjanaSuma += val.mediana;
               }
               let mitjanaGlobal = Number((mitjanaSuma / numProf).toFixed(2));
               chartData[i].data.push({ name: dia, y: mitjanaGlobal });
            }
         })
      };
      chartData[i].data = _.orderBy(chartData[i].data, 'name');
   });
   return chartData;
}

export const getLastDate = async (filter?: any, db?: string) => {
   const sort = '_id'
   const data = await getAccessibilitats(filter, sort, db);
   const lastDay = data[data.length - 1].dia.toString();
   const lastMonth = data[data.length - 1].mes.toString();
   const lastYear = data[data.length - 1].any.toString();
   return { dia: lastDay, mes: lastMonth, any: lastYear };
}

export const getYears = async () => {
   const data = await getAccessibilitats({});
   const yearsGroup = _.groupBy(data, 'any');
   let years: string[] = []
   for (const [key, value] of (Object.entries(yearsGroup) as [string, any][])) {
      years.push(key);
   }
   return years;
}

export const getSectors = async (filter: any, db?: string) => {
   const data = await getAccessibilitats(filter);
   const sectorsGroup = _.groupBy(data, 'sector');
   return Object.keys(sectorsGroup);
}