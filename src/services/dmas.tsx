import _, { slice } from "lodash"

const getDmas = async (filter: any) => {
   return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dmas`,
      {
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

export const getDma = async (up: string) => {
   return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dmas/${up}`,
      {
         method: 'GET'
      }).then(res => res.json());
}

export const getDmaDashboard = async (up: string) => {
   const dma = await getDma(up);
   let primerIndiceNoNulo = dma.import_liquid_acumulat_periode_actual.findIndex((elemento: null) => elemento !== null);

   const data = [{
      name: 'import liquid acumulat',
      data: dma.import_liquid_acumulat_periode_actual.slice(primerIndiceNoNulo)
   }]
   return data;
}

export const getDmaAssignada = async (up: string) => {
   const dma = await getDma(up);
   return dma.dma_assignada[dma.dma_assignada.length - 1];
}