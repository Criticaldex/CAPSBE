import _ from "lodash"
import { getSession } from "@/services/session"

const getIqfs = async (filter: any) => {
   return fetch('http://localhost:3000/api/iqfs',
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

export const getIqf = async (up: string) => {
   return fetch(`http://localhost:3000/api/iqfs/${up}`,
      {
         method: 'GET'
      }).then(res => res.json());
}

export const getIqfDashboard = async (up: string) => {
   const iqf = await getIqf(up);
   const data = [{
      name: 'universal',
      data: iqf.puntuacio_universals
   }, {
      name: 'selecció',
      data: iqf.puntuacio_seleccio
   }, {
      name: 'hiperprescripció',
      data: iqf.puntuacio_hiperprescripcio
   }]
   return data;
}

export const getBasal = async (up: string) => {
   const iqf = await getIqf(up);
   return iqf.basal;
}

export const getUniversals = async (year: string, centros: any) => {
   const ups: any[] = [];
   const categories = ['matma', 'biosimilars']
   centros.map(({ id, name, up }: any) => (
      ups.push(up)
   ))

   const iqfs = await getIqfs({
      any: year,
      up: {
         $in: ups
      }
   });

   const data: any[] = iqfs.map((iqf: any) => {
      let name: string = '';
      centros.map((centro: { up: any; name: string; }) => {
         if (centro.up == iqf.up) {
            name = centro.name;
         }
      })
      // name += ' - ' + iqf.puntuacio_universals[iqf.puntuacio_universals.length - 1] + ' punts';

      const matma = iqf.indicadors_universals.matma;
      const biosimilars = iqf['indicadors_universals_(biosimilars)'].biosimilars;

      const dades = [
         matma.puntuacio[matma.puntuacio.length - 1],
         biosimilars.puntuacio[biosimilars.puntuacio.length - 1],
      ]

      return {
         name: name,
         data: dades,
      }
   });

   return {
      categories,
      data
   };
}

export const getUniversalsDetall = async (year: string, centros: any, seccio: any) => {
   const ups: any[] = [];
   centros.map(({ id, name, up }: any) => (
      ups.push(up)
   ))

   const iqfs = await getIqfs({
      any: year,
      up: {
         $in: ups
      }
   });

   const data: any[] = iqfs.map((iqf: any) => {
      let name: string = '';

      centros.map((centro: { up: any; name: string; }) => {
         if (centro.up == iqf.up) {
            name = centro.name;
         }
      })

      let dades: any = ''
      switch (seccio) {
         case 'biosimilars':
            dades = iqf['indicadors_universals_(biosimilars)'].biosimilars['%'];
            break;
         default:
            dades = iqf.indicadors_universals.matma['%'];
            break;
      }

      const map = dades.map((item: any) => item * 100)
      return {
         name: name,
         data: map,
      }
   });

   return data;
}

export const getPlotLines = async (seccio: any) => {
   let plotlines: any = '';
   switch (seccio) {
      case 'matma':
         plotlines = [{
            color: 'var(--green)',
            value: 0.71,
            label: {
               text: '10p'
            }
         }, {
            color: 'var(--yellow)',
            value: 0.81,
            label: {
               text: '8p'
            }
         }, {
            color: 'var(--orange)',
            value: 0.94,
            label: {
               text: '6p'
            }
         }, {
            color: 'var(--orange-1)',
            value: 1.04,
            label: {
               text: '4p'
            }
         }, {
            color: 'var(--red)',
            value: 1.30,
            label: {
               text: '2p'
            }
         }]
         break;

      case 'hiperprescripcio':

         break;

      case 'seleccio':

         break;

      default:
         break;
   }
   return plotlines;
}