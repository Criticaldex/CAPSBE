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

export const getLastDay = async (filter: any, db?: string) => {
   const sort = 'dia'
   const data = await getDemoras(filter, sort, db);
   const daysGroup = _.groupBy(data, 'dia');
   const days = Object.keys(daysGroup);
   const lastDay = _.orderBy(days);
   return lastDay[lastDay.length - 1];
}

export const getChartDemorasSector = async (filter: any, db?: string, color?: string) => {
   const sort = ''
   let data = await getDemoras(filter, sort, db);
   let chartData: any = [{
      type: 'column',
      name: 'Mitjana',
      color: color,
      data: []
   }];

   if (data.length != 1) {
      return chartData;
   }
   else data = data[0];

   for (const [prof, dataProf] of (Object.entries(data.professionals) as [string, any][])) {
      const split: string[] = (prof) ? prof.split(',') : [];
      const nom = (split[1]) ? split[1] : split[0];
      chartData[0].data.push({ name: prof, y: dataProf.mediana, max: dataProf.maxim, min: dataProf.minim });
   };
   chartData[0].data = _.orderBy(chartData[0].data, 'y', 'desc')
   return chartData;
}

export const getProfessionalMonth = async (filter: any, professional: string, db?: string, color?: string) => {
   const sort = 'dia'
   let data = await getDemoras(filter, sort, db);

   let chartData: any = [{
      type: 'spline',
      name: 'Mitjana',
      color: color,
      zIndex: 1,
      marker: {
         fillColor: 'white',
         lineWidth: 2,
         lineColor: color
      },
      data: []
   }, {
      type: 'columnrange',
      name: 'Rang',
      color: color,
      lineWidth: 0,
      linkedTo: ':previous',
      opacity: 0.6,
      zIndex: 0,
      marker: {
         enabled: false
      },
      data: []
   }];

   data.map((dia: any) => {
      chartData[0].data.push({
         name: dia.dia,
         y: dia.professionals[professional].mediana,
      });
      chartData[1].data.push({
         name: dia.dia,
         high: dia.professionals[professional].maxim,
         low: dia.professionals[professional].minim,
      });
   })
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
