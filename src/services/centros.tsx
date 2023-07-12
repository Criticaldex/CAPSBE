import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const getCentros = async () => {
   const session = await getServerSession(authOptions)
   return fetch('http://localhost:3000/api/centers',
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
                  "centers",
                  "-_id"
               ],
               db: session?.user.db
            }
         ),
      }).then(res => res.json());
}

export const getContractsCenters = async (year: any) => {
   const centros: any = await getCentros();
   return await centros.centers.map((centro: string, i: number) => {
      return {
         id: i.toString(),
         name: centro,
         link: `/contracts/${year}/${i}`
      }
   })
}

export const getProfessionalsCenters = async () => {
   const centros: any = await getCentros();
   return await centros.centers.map((centro: string, i: number) => {
      return {
         id: i.toString(),
         name: centro
      }
   })
}