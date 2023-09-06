import _ from "lodash"

// const url = 'http://192.168.1.167:3000';
// const url = 'http://localhost:3333';
const url = 'http://trial.soidemdt.com:3000';
// const url = 'http://trial.soidemdt.com:3333';

const getIqfs = async (filter: any) => {
   return fetch(`${url}/api/iqfs`,
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
   return fetch(`${url}/api/iqfs/${up}`,
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

export const getHiper = async (year: string, centros: any) => {
   const ups: any[] = [];
   const categories = ['aines', 'condoprotectors', 'antiulcerosos', 'benzodiazepines', 'antibacterians', 'antiespasmodics']
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

      let dades: any = [];

      for (const [key, value] of (Object.entries(iqf.indicadors_dhiperprescripcio) as [string, any][])) {
         if (value.puntuacio) {
            dades.push(value.puntuacio[value.puntuacio.length - 1])
         }
      }

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

export const getSeleccio = async (year: string, centros: any) => {
   let categories: any[] = [];
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

      let cat: any[] = [];
      let dades: any = [];

      for (const [key, value] of (Object.entries(iqf.indicadors_de_seleccio_de_medicaments) as [string, any][])) {
         if (value.puntuacio) {
            dades.push(value.puntuacio[value.puntuacio.length - 1])
            cat.push(key);
         }
      }

      categories = cat;

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

      let dades: any = '';

      switch (seccio) {
         case 'biosimilars':
            dades = iqf['indicadors_universals_(biosimilars)'].biosimilars['%'];
            break;
         default:
            dades = iqf.indicadors_universals.matma['%'];
            break;
      }

      const map = dades.map((item: any) => parseFloat((item * 100).toFixed(2)))
      return {
         name: name,
         data: map,
      }
   });

   return data;
}

export const getHiperDetall = async (year: string, centros: any, seccio: any) => {
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

      const dades = iqf['indicadors_dhiperprescripcio'][seccio].dhd;

      const map = dades.map((item: any) => {
         if (!item) {
            return 0;
         } else return parseFloat((item).toFixed(2));
      })
      return {
         name: name,
         data: map,
      }
   });

   return data;
}

export const getSeleccioDetall = async (year: string, centros: any, seccio: any) => {
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

      const dades = iqf['indicadors_de_seleccio_de_medicaments'][seccio]['%'];


      const map = dades.map((item: any) => {
         if (!item) {
            return 0;
         } else return parseFloat((item * 100).toFixed(2));
      })
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

      case 'biosimilars':
         plotlines = [{
            color: 'var(--green)',
            value: 32,
            label: {
               text: '5p'
            }
         }, {
            color: 'var(--yellow)',
            value: 24,
            label: {
               text: '3p'
            }
         }, {
            color: 'var(--red)',
            value: 17,
            label: {
               text: '1p'
            }
         }]
         break;

      //Hiperprescripcio

      case 'aines':
         plotlines = [{
            color: 'var(--green)',
            value: 22.3,
            label: {
               text: '6p'
            }
         }, {
            color: 'var(--yellow)',
            value: 26.7,
            label: {
               text: '4p'
            }
         }, {
            color: 'var(--orange)',
            value: 30,
            label: {
               text: '3p'
            }
         }, {
            color: 'var(--orange-1)',
            value: 33.7,
            label: {
               text: '2p'
            }
         }, {
            color: 'var(--red)',
            value: 37.5,
            label: {
               text: '1p'
            }
         }]
         break;

      case 'antiulcerosos':
         plotlines = [{
            color: 'var(--green)',
            value: 96.1,
            label: {
               text: '9p'
            }
         }, {
            color: 'var(--yellow)',
            value: 103.9,
            label: {
               text: '7p'
            }
         }, {
            color: 'var(--orange)',
            value: 112.9,
            label: {
               text: '5p'
            }
         }, {
            color: 'var(--orange-1)',
            value: 119.9,
            label: {
               text: '3p'
            }
         }, {
            color: 'var(--red)',
            value: 126.1,
            label: {
               text: '1p'
            }
         }]
         break;

      case 'condoprotectors':
         //SYSADOA al pdf
         plotlines = [{
            color: 'var(--green)',
            value: 1,
            label: {
               text: '2p'
            }
         }, {
            color: 'var(--red)',
            value: 1.6,
            label: {
               text: '1p'
            }
         }]
         break;

      case 'benzodiazepines':
         plotlines = [{
            color: 'var(--green)',
            value: 56.2,
            label: {
               text: '7p'
            }
         }, {
            color: 'var(--yellow)',
            value: 63.4,
            label: {
               text: '5p'
            }
         }, {
            color: 'var(--orange)',
            value: 68.8,
            label: {
               text: '3p'
            }
         }, {
            color: 'var(--orange-1)',
            value: 77.1,
            label: {
               text: '2p'
            }
         }, {
            color: 'var(--red)',
            value: 86.1,
            label: {
               text: '1p'
            }
         }]
         break;

      case 'antiespasmodics':
         plotlines = [{
            color: 'var(--green)',
            value: 5.8,
            label: {
               text: '6p'
            }
         }, {
            color: 'var(--yellow)',
            value: 6.7,
            label: {
               text: '4p'
            }
         }, {
            color: 'var(--orange)',
            value: 7.4,
            label: {
               text: '3p'
            }
         }, {
            color: 'var(--orange-1)',
            value: 8.2,
            label: {
               text: '2p'
            }
         }, {
            color: 'var(--red)',
            value: 9.1,
            label: {
               text: '1p'
            }
         }]
         break;

      case 'antibacterians':
         //Antibiotics al pdf
         plotlines = [{
            color: 'var(--green)',
            value: 5.8,
            label: {
               text: '10p'
            }
         }, {
            color: 'var(--yellow)',
            value: 6.8,
            label: {
               text: '8p'
            }
         }, {
            color: 'var(--orange)',
            value: 7.7,
            label: {
               text: '6p'
            }
         }, {
            color: 'var(--orange-1)',
            value: 8.6,
            label: {
               text: '4p'
            }
         }, {
            color: 'var(--red)',
            value: 9.3,
            label: {
               text: '2p'
            }
         }]
         break;

      //Seleccio

      case 'antihipertensius':
         plotlines = [{
            color: 'var(--green)',
            value: 71,
            label: {
               text: '6p'
            }
         }, {
            color: 'var(--yellow)',
            value: 70,
            label: {
               text: '5p'
            }
         }, {
            color: 'var(--orange)',
            value: 68,
            label: {
               text: '3p'
            }
         }, {
            color: 'var(--orange-1)',
            value: 66,
            label: {
               text: '2p'
            }
         }, {
            color: 'var(--red)',
            value: 64,
            label: {
               text: '1p'
            }
         }]
         break;

      case 'ibp':
         plotlines = [{
            color: 'var(--green)',
            value: 90,
            label: {
               text: '6p'
            }
         }, {
            color: 'var(--yellow)',
            value: 89,
            label: {
               text: '4p'
            }
         }, {
            color: 'var(--red)',
            value: 87,
            label: {
               text: '2p'
            }
         }]
         break;

      case 'osteoporosi':
         plotlines = [{
            color: 'var(--green)',
            value: 64,
            label: {
               text: '5p'
            }
         }, {
            color: 'var(--yellow)',
            value: 61,
            label: {
               text: '4p'
            }
         }, {
            color: 'var(--orange)',
            value: 58,
            label: {
               text: '3p'
            }
         }, {
            color: 'var(--orange-1)',
            value: 53,
            label: {
               text: '2p'
            }
         }, {
            color: 'var(--red)',
            value: 48,
            label: {
               text: '1p'
            }
         }]
         break;

      case 'hipocolesterolemiants':
         plotlines = [{
            color: 'var(--green)',
            value: 80,
            label: {
               text: '6p'
            }
         }, {
            color: 'var(--yellow)',
            value: 78,
            label: {
               text: '5p'
            }
         }, {
            color: 'var(--orange)',
            value: 75,
            label: {
               text: '3p'
            }
         }, {
            color: 'var(--red)',
            value: 73,
            label: {
               text: '1p'
            }
         }]
         break;

      case 'antidepressius_1a_linia':
         plotlines = [{
            color: 'var(--green)',
            value: 66,
            label: {
               text: '6p'
            }
         }, {
            color: 'var(--yellow)',
            value: 65,
            label: {
               text: '5p'
            }
         }, {
            color: 'var(--orange)',
            value: 63,
            label: {
               text: '4p'
            }
         }, {
            color: 'var(--orange-1)',
            value: 62,
            label: {
               text: '3p'
            }
         }, {
            color: 'var(--red)',
            value: 59,
            label: {
               text: '1p'
            }
         }]
         break;

      case 'antidepressius_2a_linia':
         plotlines = [{
            color: 'var(--green)',
            value: 41,
            label: {
               text: '2p'
            }
         }, {
            color: 'var(--red)',
            value: 36,
            label: {
               text: '1p'
            }
         }]
         break;

      case 'hipoglucemiants_monoterapia_recomanada':
         plotlines = [{
            color: 'var(--green)',
            value: 77,
            label: {
               text: '4p'
            }
         }, {
            color: 'var(--yellow)',
            value: 75,
            label: {
               text: '3p'
            }
         }, {
            color: 'var(--red)',
            value: 74,
            label: {
               text: '2p'
            }
         }]
         break;

      case 'hipoglucemiants_biterapia_recomanada':
         plotlines = [{
            color: 'var(--green)',
            value: 46,
            label: {
               text: '4p'
            }
         }, {
            color: 'var(--yellow)',
            value: 41,
            label: {
               text: '3p'
            }
         }, {
            color: 'var(--red)',
            value: 39,
            label: {
               text: '2p'
            }
         }]
         break;

      case 'mpoc_seleccio':
         plotlines = [{
            color: 'var(--green)',
            value: 37,
            label: {
               text: '7p'
            }
         }, {
            color: 'var(--yellow)',
            value: 35,
            label: {
               text: '5p'
            }
         }, {
            color: 'var(--orange)',
            value: 32,
            label: {
               text: '3p'
            }
         }, {
            color: 'var(--orange-1)',
            value: 30,
            label: {
               text: '2p'
            }
         }, {
            color: 'var(--red)',
            value: 26,
            label: {
               text: '1p'
            }
         }]
         break;

      default:
         plotlines = [];
         break;
   }
   return plotlines;
}