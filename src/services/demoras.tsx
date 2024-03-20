import _ from "lodash"
import { getSession } from "@/services/session";
import { DemoraIface } from "@/schemas/demora";
import { getCenters } from "./centros";

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
   const sectors = Object.keys(sectorGroup).sort();

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
   const data = await getDemoras(filter, sort, db);
   const lastDay = data[data.length - 1].dia.toString();
   const lastMonth = data[data.length - 1].mes.toString();
   const lastYear = data[data.length - 1].any.toString();
   return { dia: lastDay, mes: lastMonth, any: lastYear };
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

   let professionals: any = {};

   for (const [dia, sectorsDia] of (Object.entries(data) as [string, any][])) {
      for (const [prof, dataProf] of (Object.entries(sectorsDia.professionals) as [string, any][])) {
         if (dataProf.mediana != undefined || dataProf.mediana != null) {
            if (professionals[prof]) {
               professionals[prof] += dataProf.mediana;
            } else {
               professionals[prof] = dataProf.mediana;
            }
         };
      };
   };
   for (const [prof, total] of (Object.entries(professionals) as [string, any][])) {
      chartData[0].data.push({ name: prof, y: parseFloat((total / data.length).toFixed(2)) });
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
         y: (dia.professionals[professional]) ? dia.professionals[professional].mediana : null,
      });
      chartData[1].data.push({
         name: dia.dia,
         high: (dia.professionals[professional]) ? dia.professionals[professional].maxim : null,
         low: (dia.professionals[professional]) ? dia.professionals[professional].minim : null,
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

export const getSectors = async (filter: any, db?: string) => {
   const data = await getDemoras(filter);
   const sectorsGroup = _.groupBy(data, 'sector');
   return Object.keys(sectorsGroup);
}

export const getDemorasToday = async (date: { dia: string, mes: string, any: string }) => {
   const filter = {
      centro: {
         $nin: [
            "Average",
            "Total",
         ]
      },
      ...date
   };
   const centros = await getCenters();
   const demoras = await getDemoras(filter);
   const lastDate = await getLastDate();
   const sectorGroup = _.groupBy(demoras, 'sector');
   // const sectors = _.orderBy(Object.keys(sectorGroup), 'desc');

   let tableData: { centro: string, centroName: string }[] = [];
   centros.forEach(async (centro: { name: string, up: string, id: string }) => {
      if (!demoras[0]) {
         tableData.push({
            "centro": centro.id,
            "centroName": centro.name
         })
      } else {
         let tableLine: any = {};
         for (const [key, sector] of (Object.entries(sectorGroup) as [string, any][])) {
            sector.forEach((demora: any) => {
               if (centro.id == demora.centre) {
                  let total = 0;
                  let length = Object.keys(demora.professionals).length;
                  for (const [key, prof] of (Object.entries(demora.professionals) as [string, any][])) {
                     total += prof.mediana;
                  };
                  let mitja = Number((total / length).toFixed(2));

                  tableLine = {
                     ...tableLine,
                     centro: demora.centre,
                     centroName: centro.name,
                     [key.replaceAll(' ', '_')]: mitja,
                     lastDate
                  };
               }
            });
         }
         tableData.push(tableLine);
      };
   });
   return tableData;
}

export const getMitjaSetmanal = async () => {
   const lastDate = await getLastDate();
   const today = new Date(lastDate.any, lastDate.mes, lastDate.dia);
   let lastweek = new Date();
   lastweek.setDate(today.getDate() - 7);
   let pad = '00';
   const lastWeek = { any: lastweek.getFullYear().toString(), mes: (pad + (lastweek.getMonth() + 1).toString()).slice(-pad.length), dia: (pad + lastweek.getDate().toString()).slice(-pad.length) }

   let dates: any = {};

   if (parseInt(lastDate.dia) < 8) {
      let days = [];
      let days2 = [];
      for (let i = 0; i < 7; i++) {
         days.push(('00' + (parseInt(lastWeek.dia) + i).toString()).slice(-2));
      }
      for (let i = 0; i < 7; i++) {
         days2.push(('00' + (parseInt(lastDate.dia) - i).toString()).slice(-2));
      }
      dates = {
         $or: [{
            dia: {
               $in: days
            },
            any: lastWeek.any,
            mes: lastWeek.mes,
         }, {
            dia: {
               $in: days2
            },
            any: lastDate.any,
            mes: lastDate.mes,
         }]
      }
   } else {
      let days = [];
      for (let i = 0; i < 8; i++) {
         days.push(('00' + (parseInt(lastDate.dia) - i).toString()).slice(-2));
      }
      dates = {
         dia: {
            $in: days
         },
         any: lastDate.any,
         mes: lastDate.mes,
      }
   }

   let demoras = await getDemoras(dates);
   const centreGroup = _.groupBy(demoras, 'centre');
   let mitjaCentres: any = {};
   for (const [key, centre] of (Object.entries(centreGroup) as [string, any][])) {
      let divident = 0;
      let divisor = 0;
      centre.forEach((element: any) => {
         for (const [key, prof] of (Object.entries(element.professionals) as [string, any][])) {
            divident += prof.mediana;
            divisor++;
         }
      });
      mitjaCentres[key] = divident / divisor;
   };
   return mitjaCentres;
}

export const getChartDemorasYear = async (filter: any, db?: string) => {
   const monthName = ['Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juliol', 'Agost', 'Setembre', 'Octubre', 'Novembre', 'Desembre'];
   const sort = 'dia'
   const data = await getDemoras(filter, sort, db);
   const monthsGroup = _.groupBy(data, 'mes');
   const sectorGroup = _.groupBy(data, 'sector');
   const sectors = Object.keys(sectorGroup).sort();

   let chartData: any = [];

   sectors.forEach((sector, i) => {
      chartData.push({
         type: 'spline',
         name: sector,
         data: []
      });

      for (const [mes, sectorsMes] of (Object.entries(monthsGroup) as [string, any][])) {
         let mitjanaSuma: number = 0;
         let numProf: number = 0;
         sectorsMes.map((sec: any) => {
            if (sec.sector == sector) {
               for (const [k, val] of (Object.entries(sec.professionals) as [string, any][])) {
                  mitjanaSuma += val.mediana;
                  numProf++;
               }
            }
         })
         let mitjanaGlobal = Number((mitjanaSuma / numProf).toFixed(2));
         chartData[i].data.push({ name: monthName[Number(mes) - 1], monthNum: mes, y: mitjanaGlobal });
      };
      chartData[i].data = _.orderBy(chartData[i].data, 'name');
   });
   return chartData;
}
