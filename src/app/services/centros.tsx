import _ from "lodash"

const getCentros = (filter: any) => {
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

export const getContractsCenters = async (year: any) => {
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

export const getProfesionalsCenters = async () => {
   const centro: any = await getCentros({});
   let data = await centro[0].Centros.map((centro: string, i: number) => {
      return {
         id: i.toString(),
         name: centro
      }
   })
   return data
}