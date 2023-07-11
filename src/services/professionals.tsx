import _ from "lodash"

const getProfessionals = async (filter: any) => {
   filter.identificador = {
      $in: [
         "EQAU0208",
         "EQAU0235",
         "EQAU0301",
         "EQAU0239",
         "EQAU0702"
      ]
   }
   return fetch('http://localhost:3000/api/professionals',
      {
         next: {
            tags: ['dbData']
         },
         method: 'POST',
         headers: {
            'Content-type': 'application/json',
         },
         body: JSON.stringify(
            {
               fields: [
                  "indicador",
                  "sector",
                  "any",
                  "centre",
                  "professionals",
                  "objectiu",
                  "invers",
                  "-_id"
               ],
               filter: filter
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

export const getSections = async (center: any, year: any) => {
   let filtros = (center == 'all') ? { 'any': year } : { 'any': year, 'centre': center }
   const data = await getProfessionals(filtros);
   let groupBySec = _.groupBy(data, 'sector');
   let sectors: string[] = [];
   for (const [key, value] of (Object.entries(groupBySec) as [string, any][])) {
      sectors.push(key);
   }
   return sectors;
}

export const getYears = async (center: any, section: any) => {
   let filtros = (center == 'all') ? { 'sector': section.replaceAll('_', ' ') } : { 'sector': section.replaceAll('_', ' '), 'centre': center }
   const data = await getProfessionals(filtros);
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
   let indi: string[] = [];
   for (const [key, value] of (Object.entries(data) as [string, any][])) {
      indi.push(key);
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