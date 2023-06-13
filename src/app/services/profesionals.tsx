import _ from "lodash"
const getMongoData = (filter: any) => {
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
                  "profesionals",
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
      return {
         name: i.Indicador,
         data: i.profesionals.map((res: string) => res)
      }
   })
}

export const getTableIndicators = async (filtros: any) => {
   const data = await getMongoData(filtros);
   return _.groupBy(data, 'Indicador');
}