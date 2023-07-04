import _ from "lodash"
const getProfesionals = async (filter: any) => {
   filter.indicador = {
      $in: [
         "EQAU0208 - DM2: Cribratge peu",
         "EQAU0235 - HTA: control de la TA en pacients amb IRC",
         "EQAU0301 - Cribratge del consum d'alcohol",
         "EQAU0239 - Ús incorrrecte PSA en majors 70 anys",
         "EQAU0702 - EQAU0702 - Cobertura vacunal sistemàtica infantil"
      ]
   }
   const prof = await fetch('http://localhost:3000/api/profesionals',
      {
         method: 'POST',
         headers: {
            'Content-type': 'application/json',
         },
         body: JSON.stringify(
            {
               model: 'profesional',
               fields: [
                  "indicador",
                  "sector",
                  "any",
                  "centre",
                  "professionals",
                  "objectiu",
                  "-_id"
               ],
               filter: filter
            }
         ),
      });

   return await prof.json();


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
   const data = await getProfesionals(filtros);
   return _.groupBy(data, 'indicador');
}

export const getSections = async (center: any, year: any) => {
   let filtros = (center == 'all') ? { 'any': year } : { 'any': year, 'centre': center }
   const data = await getProfesionals(filtros);
   let groupBySec = _.groupBy(data, 'sector');
   let sectors: string[] = [];
   for (const [key, value] of (Object.entries(groupBySec) as [string, any][])) {
      sectors.push(key);
   }
   return sectors;
}

export const getYears = async (center: any, section: any) => {
   let filtros = (center == 'all') ? { 'sector': section.replaceAll('_', ' ') } : { 'sector': section.replaceAll('_', ' '), 'centre': center }
   const data = await getProfesionals(filtros);
   let groupByYear = _.groupBy(data, 'any');
   let years: string[] = [];
   for (const [key, value] of (Object.entries(groupByYear) as [string, any][])) {
      years.push(key);
   }
   return years;
}

export const getProfesionalsList = async (filtros: any) => {
   const data = await getProfesionals(filtros);
   let groupByCentre = _.groupBy(data, 'centre');
   let prof: string[] = [];
   for (const [key, value] of (Object.entries(groupByCentre) as [string, any][])) {
      for (const [key] of (Object.entries(value[0].professionals) as [string, any][])) {
         prof.push(key);
      }
   }
   return prof;
}

export const getCentre = async (profesional: string) => {
   const data = await getProfesionals({});
   for (let i = 0; i < data.length; i++) {
      for (const [key, value] of (Object.entries(data[i].professionals) as [string, any][])) {
         if (key.includes(profesional)) {
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

export const getChartIndividual = async (filtros: any, profesional: string) => {
   const data = await getProfesionals(filtros);
   let chart: any[] = [];
   let item: { name: string, data: number[] };
   data.map((d: any, i: number) => {
      for (const [key, value] of (Object.entries(d.professionals) as [string, any][])) {
         if (key.includes(profesional)) {
            chart.push({
               name: d.indicador,
               data: value
            })
         }
      }
   })

   return chart;
}