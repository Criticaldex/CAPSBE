import _ from "lodash"

const getEqas = async (filter: any) => {
   return fetch('http://localhost:3000/api/eqas',
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
               fields: [
                  "-_id"
               ],
               filter: filter,
            }
         ),
      }).then(res => res.json());
}

export const getEqasContracts = async (year: string, centers: any) => {
   const filter = { 'any': year }
   const data = await getEqas(filter);

   return data.map((i: any) => {
      return {
         name: centers[i.centre].name,
         data: i.punts
      }
   })
}