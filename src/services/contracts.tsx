import _ from "lodash"

const getContracts = async (filter: any) => {
   return fetch('http://localhost:3000/api/contracts',
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
               db: 'SaVa',
               fields: [
                  "identificador",
                  "indicador",
                  "resultat",
                  "any",
                  "centre",
                  "objectiu",
                  "invers",
                  "-_id"
               ],
               filter: filter,
            }
         ),
      }).then(res => res.json());
}

export const getChartIndicators = async (year: string, center: string) => {
   const filter = { "any": year, "centre": center };
   const data = await getContracts(filter);

   return data.map((i: any) => {
      return {
         name: i.identificador,
         data: i.resultat
      }
   })
}

export const getTableIndicators = async (year: string) => {
   const data = await getContracts({ "any": year });
   return _.groupBy(data, 'indicador');
}

export const getYears = async () => {
   const data = await getContracts({});
   const yearsGroup = _.groupBy(data, 'any');
   let years: string[] = []
   for (const [key, value] of (Object.entries(yearsGroup) as [string, any][])) {
      years.push(key);
   }
   return years;
}