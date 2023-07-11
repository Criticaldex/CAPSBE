import _ from "lodash"

const getContracts = (filter: any) => {
   return fetch('http://localhost:3000/api/contracts',
      {
         cache: 'no-store',
         method: 'POST',
         headers: {
            'Content-type': 'application/json',
         },
         body: JSON.stringify(
            {
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
               filter: filter
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

export const getYearsContracts = async (year: string) => {
   const data = await getContracts({});
   const years = _.groupBy(data, 'any');
   for (const [key, value] of (Object.entries(years) as [string, any][])) {

   }
}