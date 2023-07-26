import { getSession } from "@/services/session"


const getCentros = async () => {
   const session = await getSession();
   return fetch('http://localhost:3000/api/centers',
      {
         method: 'POST',
         headers: {
            'Content-type': 'application/json',
         },
         body: JSON.stringify(
            {
               db: session?.user.db,
               fields: [
                  "centers",
                  "-_id"
               ],
            }
         ),
      }).then(res => res.json());
}

export const getCenters = async () => {
   const centros: any = await getCentros();
   return await centros.centers.map((centro: string, i: number) => {
      return {
         id: i.toString(),
         name: centro,
      }
   })
}