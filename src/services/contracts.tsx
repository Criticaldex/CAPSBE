import _ from "lodash"

const getContracts = (filter: any) => {
   return fetch('http://localhost:3000/api/contracts',
      {
         // cache: 'no-store',
         method: 'POST',
         headers: {
            'Content-type': 'application/json',
         },
         body: JSON.stringify(
            {
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
   const data = await getContracts(filtros);
   return data.map((i: any) => {
      return {
         name: i.Indicador,
         data: i.Resultat.map((res: string) => parseFloat(res.replaceAll(',', '.')))
      }
   })
}

export const getTableIndicators = async (filtros: any) => {
   const data = await getContracts(filtros);
   return _.groupBy(data, 'Indicador');
}