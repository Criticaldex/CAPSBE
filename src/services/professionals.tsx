import _ from "lodash"
import { getSession } from "@/services/session"

const getProfessionals = async (filter: any) => {
   const session = await getSession();

   filter.identificador = {
      $in: [
         "EQAU0208",
         "EQAU0235",
         "EQAU0301",
         "EQAU0239",
         "EQAU0702",
         "IT001TOT",
         // "IT001OST",
         // "IT001MEN",
         // "IT001ALT",
         // "IT003TOT",
         "ACC5DF",
         "CONT0002A"
      ]
   }
   return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/professionals`,
      {
         method: 'POST',
         headers: {
            'Content-type': 'application/json',
         },
         body: JSON.stringify(
            {
               db: session?.user.db,
               fields: [
                  "indicador",
                  "identificador",
                  "sector",
                  "any",
                  "centre",
                  "professionals",
                  "objectiu",
                  "invers",
                  "-_id"
               ],
               filter: filter,
            }
         ),
      }).then(res => res.json());
}

export const getChartIndicators = async (filtros: any) => {
   const data = await getTableIndicators(filtros);
   let res: any = [];
   for (const [key, value] of (Object.entries(data) as [string, any][])) {
      value.map((i: any) => {
         for (const [key, value] of (Object.entries(i.professionals) as [string, any][])) {
            res.push({
               name: key,
               data: value[Object.keys(value)[Object.keys(value).length - 1]]
            })
         }
      })
   }
   let item = _.groupBy(res, 'name');

   let results: any = [];
   for (const [key, value] of (Object.entries(item) as [string, any][])) {
      let result: { name: string, data: number[], threshold: number, maxPointWidth: number } = {
         name: "",
         data: [],
         threshold: 0,
         maxPointWidth: 50
      };
      result.name = key
      value.map((i: any) => {
         result.data.push(i.data)
      })
      results.push(result);
   }
   return results;
}

export const getTableIndicators = async (filtros: any) => {
   const data = await getProfessionals(filtros);
   return _.groupBy(data, 'indicador');
}

export const getSections = async () => {
   const data = await getProfessionals({});
   let groupBySec = _.groupBy(data, 'sector');
   let sectors: string[] = [];
   for (const [key, value] of (Object.entries(groupBySec) as [string, any][])) {
      sectors.push(key);
   }
   return sectors;
}

export const getYears = async () => {
   const data = await getProfessionals({});
   let groupByYear = _.groupBy(data, 'any');
   let years: string[] = [];
   for (const [key, value] of (Object.entries(groupByYear) as [string, any][])) {
      years.push(key);
   }
   return years;
}

export const getProfessionalsList = async (filtros: any) => {
   const data = await getProfessionals(filtros);
   let groupByCentre = _.groupBy(data, 'centre');
   let prof: string[] = [];
   for (const [key, value] of (Object.entries(groupByCentre) as [string, any][])) {
      for (const [key] of (Object.entries(value[0].professionals) as [string, any][])) {
         prof.push(key);
      }
   }
   return prof;
}

export const getCentre = async (professional: string) => {
   const data = await getProfessionals({});
   for (let i = 0; i < data.length; i++) {
      for (const [key, value] of (Object.entries(data[i].professionals) as [string, any][])) {
         if (key.includes(professional)) {
            return data[i].centre;
         }
      }
   }

}

export const getIndicators = async (filtros: any) => {
   const data = await getTableIndicators(filtros);
   let indi: any = [];
   for (const [key, value] of (Object.entries(data) as [string, any][])) {
      indi.push({ 'name': key, 'obj': data[key][0].invers == false ? data[key][0].objectiu : -data[key][0].objectiu });
   }
   return indi;
}

export const getChartIndividual = async (filtros: any, professional: string) => {
   const data = await getProfessionals(filtros);
   let chart: any[] = [];
   let item: { name: string, data: number[] };
   data.map((d: any, i: number) => {
      for (const [key, value] of (Object.entries(d.professionals) as [string, any][])) {
         if (key.includes(professional)) {
            chart.push({
               name: d.indicador,
               data: value
            })
         }
      }
   })

   return chart;
}

export const getMonth = async (filtros: any) => {
   const data = await getProfessionals(filtros);
   const meses = ['Gener', 'Febrer', 'Març', 'Abril', 'Maig', 'Juny', 'Juliol', 'Agost', 'Setembre', 'Octubre', 'Novembre', 'Desembre']
   let mes = data[0].professionals[Object.keys(data[0].professionals)[0]].length - 1;

   return meses[mes];
}