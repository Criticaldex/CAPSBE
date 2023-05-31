export const getMongoData = (filter: any) => {
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
               model: 'contract',
               fields: [
                  "Indicador",
                  "Resultat",
                  "Any",
                  "Centre",
                  "-_id"
               ],
               filter: filter
            }
         ),
      }).then(res => res.json());
}

export const getChartIndicators = async (data: Array<Object>) => {
   return data.map((i: any) => {
      return {
         name: i.Indicador,
         data: i.Resultat.map((res: string) => parseFloat(res.replaceAll(',', '.')))
      }
   })
}

export const getCentros = (filter: any) => {
   return fetch('http://localhost:3000/api/getMongoData',
      {
         method: 'POST',
         headers: {
            'Content-type': 'application/json',
         },
         body: JSON.stringify(
            {
               model: 'licencia',
               fields: [
                  "Centros",
                  "-_id"
               ],
               filter: filter
            }
         ),
      }).then(res => res.json());
}