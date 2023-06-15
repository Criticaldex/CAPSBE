import _ from "lodash"
const getMongoData = (filter: any) => {
   filter.Indicador = {
      $in: [
         "EQAU0208 - DM2: Cribratge peu",
         "EQAU0235 - HTA: control de la TA en pacients amb IRC",
         "EQAU0301 - Cribratge del consum d'alcohol",
         "EQAU0239 - Ús incorrrecte PSA en majors 70 anys",
         "EQAU0702 - EQAU0702 - Cobertura vacunal sistemàtica infantil"
      ]
   }
   return fetch('http://localhost:3000/api/getMongoData',
      {
         next: {
            revalidate: 10
         },
         method: 'POST',
         headers: {
            'Content-type': 'application/json',
         },
         body: JSON.stringify(
            {
               model: 'profesional',
               fields: [
                  "Indicador",
                  "sector",
                  "any",
                  "centre",
                  "professionals",
                  "-_id"
               ],
               filter: filter
            }
         ),
      }).then(res => res.json());
}

export const getChartIndicators = async (filtros: any) => {
   const data = await getMongoData(filtros);
   return data.map((i: any) => {
      for (const [key, value] of (Object.entries(i.professionals) as [string, any][])) {
         return {
            name: key,
            data: value[5]
         }
      }
   })
}

export const getTableIndicators = async (filtros: any) => {
   const data = await getMongoData(filtros);
   return _.groupBy(data, 'Indicador');
}

export const getSections = async (center: any, year: any) => {
   let filtros = (center == 'all') ? { 'any': year } : { 'any': year, 'centre': center }
   const data = await getMongoData(filtros);
   let groupBySec = _.groupBy(data, 'sector');
   let sectors: string[] = [];
   for (const [key, value] of (Object.entries(groupBySec) as [string, any][])) {
      sectors.push(key);
   }
   return sectors;
}

export const getProfesionals = async (filtros: any) => {
   filtros.Indicador = {
      $in: [
         "EQAU0208 - DM2: Cribratge peu",
         "EQAU0235 - HTA: control de la TA en pacients amb IRC",
         "EQAU0301 - Cribratge del consum d'alcohol",
         "EQAU0239 - Ús incorrrecte PSA en majors 70 anys",
         "EQAU0702 - EQAU0702 - Cobertura vacunal sistemàtica infantil"
      ]
   }
   const data = await getMongoData(filtros);
   let groupByCentre = _.groupBy(data, 'centre');
   let prof: string[] = [];
   for (const [key, value] of (Object.entries(groupByCentre) as [string, any][])) {
      for (const [key] of (Object.entries(value[0].professionals) as [string, any][])) {
         prof.push(key);
      }

   }

   return prof;
}