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

export const getChartIndicators = async (filtros: any) => {
   const data = await getMongoData(filtros);
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

export const getCleanCenters = async (year: any) => {
   const centro: any = await getCentros({});
   let data = await centro[0].Centros.map((centro: string, i: number) => {
      return {
         id: i.toString(),
         name: centro,
         link: `/contracts/${year}/${i}`
      }
   })
   return data
}