const getCentros = () => {
   return fetch('http://localhost:3000/api/centers',
      {
         cache: 'no-store',
         method: 'POST',
         headers: {
            'Content-type': 'application/json',
         },
         body: JSON.stringify(
            {
               fields: [
                  "centers",
                  "-_id"
               ],
            }
         ),
      }).then(res => res.json());
}

export const getContractsCenters = async (year: any) => {
   const centros: any = await getCentros();
   let data = await centros.centers.map((centro: string, i: number) => {
      return {
         id: i.toString(),
         name: centro,
         link: `/contracts/${year}/${i}`
      }
   })
   return data
}

export const getProfesionalsCenters = async () => {
   const centros: any = await getCentros();
   let data = await centros.centers.map((centro: string, i: number) => {
      return {
         id: i.toString(),
         name: centro
      }
   })
   return data
}