import _ from "lodash"
const getMongoData = (filter: any) => {
   return fetch('http://localhost:3000/api/getMongoData',
      {
         method: 'POST',
         headers: {
            'Content-type': 'application/json',
         },
         body: JSON.stringify(
            {
               model: 'contract',
               fields: [
                  "Indicador",
                  "Resultat",
                  "Any",
                  "Centre",
                  "Objectiu",
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
         data: i.Resultat.map((res: string) => parseFloat(res.replaceAll(',', '.')))
      }
   })
}

export const getTableIndicators = async (filtros: any) => {
   const data = await getMongoData(filtros);
   return _.groupBy(data, 'Indicador');
}