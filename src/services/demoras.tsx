import _ from "lodash"
import { getSession } from "@/services/session";
import { DemoraIface } from "@/schemas/demora";

const getDemoras = async (filter: any, sort?: string, db?: string) => {
   if (!db) {
      const session = await getSession();
      db = session?.user.db;
   }

   return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/demoras`,
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

export const updateDemoras = async (data: any) => {
   return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/demoras`,
      {
         method: 'PATCH',
         headers: {
            'Content-type': 'application/json',
         },
         body: JSON.stringify(data),
      }).then(res => res.json());
}

export const getChartDemoras = async (filter: any, db?: string) => {
   const sort = 'dia'
   const data = await getDemoras(filter, sort, db);
   const daysGroup = _.groupBy(data, 'dia');
   const sectorGroup = _.groupBy(data, 'sector');
   const sectors = Object.keys(sectorGroup);

   let chartData: any = [];

   sectors.forEach((sector, i) => {
      chartData.push({
         type: 'column',
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
      chartData[i].data = _.orderBy(chartData[i].data, 'name')
   });
   return chartData;
}

export const getChartDemorasSector = async (filter: any, db?: string) => {
   const sort = ''
   let data = await getDemoras(filter, sort, db);
   if (data.length > 1) {
      throw new Error('Error de dades');
   }
   else data = data[0];
   let chartData: any = [];

   chartData.push({
      type: 'column',
      name: 'Minim',
      data: []
   }, {
      type: 'column',
      name: 'Maxim',
      data: []
   }, {
      type: 'column',
      name: 'Mitjana',
      data: []
   });

   for (const [prof, dataProf] of (Object.entries(data.professionals) as [string, any][])) {
      chartData[0].data.push({ name: prof, y: dataProf.minim });
      chartData[1].data.push({ name: prof, y: dataProf.maxim });
      chartData[2].data.push({ name: prof, y: dataProf.mediana });
   };
   // chartData[i].data = _.orderBy(chartData[i].data, 'y')
   return chartData;
}

export const getYears = async () => {
   const data = await getDemoras({});
   const yearsGroup = _.groupBy(data, 'any');
   let years: string[] = []
   for (const [key, value] of (Object.entries(yearsGroup) as [string, any][])) {
      years.push(key);
   }
   return years;
}
