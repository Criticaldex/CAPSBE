import _ from "lodash"

const getSeguretats = async (filter: any) => {
   return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/seguretats`,
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

const getSeguretat = async (up: string, year: string) => {
   return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/seguretats/${year}/${up}`,
      {
         method: 'GET'
      }).then(res => res.json());
}

export const getYears = async (centros: any) => {
   const ups: any[] = [];
   centros.map(({ id, name, up }: any) => (
      ups.push(up)
   ))

   const seguretats = await getSeguretats({
      up: {
         $in: ups
      }
   });
   const yearsGroup = _.groupBy(seguretats, 'any');
   let years: string[] = []
   for (const [key, value] of (Object.entries(yearsGroup) as [string, any][])) {
      years.push(key);
   }
   return years;
}

export const updateSeguretat = async (data: any) => {
   data.dbName = "IQF";
   return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/seguretats`,
      {
         method: 'PATCH',
         headers: {
            'Content-type': 'application/json',
         },
         body: JSON.stringify(data),
      }).then(res => res.json());
}

export const getSeguretatDashboard = async (up: string, year: string) => {
   const seguretat = await getSeguretat(up, year);
   let primerIndiceNoNulo = seguretat.puntuacio_universals.findIndex((elemento: null) => elemento !== null);
   const data = [{
      name: 'Universal',
      data: seguretat.puntuacio_universals.slice(primerIndiceNoNulo)
   }, {
      name: 'Selecció',
      data: seguretat.puntuacio_seleccio.slice(primerIndiceNoNulo)
   }, {
      name: 'Hiperprescripció',
      data: seguretat.puntuacio_hiperprescripcio.slice(primerIndiceNoNulo)
   }]
   return data;
}

export const getTotalsSeguretat = async (year: string, centros: any) => {
   const ups: any[] = [];
   centros.map(({ id, name, up }: any) => (
      ups.push(up)
   ))

   const seguretats = await getSeguretats({
      any: year,
      up: {
         $in: ups
      }
   });

   const data: any[] = seguretats.map((seguretat: any) => {
      let name: string = '';
      centros.map((centro: { up: any; name: string; }) => {
         if (centro.up == seguretat.up) {
            name = centro.name;
         }
      })
      const dades = seguretat.puntuacio_total

      let primerIndiceNoNulo = dades.findIndex((elemento: null) => elemento !== null);
      let diferencia = null
      if (dades.slice(primerIndiceNoNulo).length > 1) {
         diferencia = dades[dades.length - 1] - dades[dades.length - 2]
      }

      return {
         name: name,
         data: dades.slice(primerIndiceNoNulo),
         diferencia: diferencia
      }
   });

   return data;
}

export const getBasal = async (up: string, year: string) => {
   const seguretat = await getSeguretat(up, year);
   return seguretat.basal;
}

export const getGeriatria = async (year: string, centros: any) => {
   const ups: any[] = [];
   // const categories = ['Medicaments inapropiats geriatria', 'Gastrolesius sense IBP', 'AINES risc CV', 'Risc Sist. Renal 75', 'Risc Sist. Renal 18', 'AIU i antiespasmòdics urinaris']
   centros.map(({ id, name, up }: any) => (
      ups.push(up)
   ))

   const seguretats = await getSeguretats({
      any: year,
      up: {
         $in: ups
      }
   });

   const geriatria = 'Medicaments potencialment inapropiats en Geratria';
   const gastrolesius = 'Combinacions F gastrolesius sense IBP';
   const aines = "Combinacio d'AINES amb risc CV + Patologia CV";
   const renal75 = "Combinacions de risc pel Sist Renal +75";
   const renal18 = "Combinacions de risc pel Sist Renal +18";
   const antiespasmodics = "Combinació AIU (>2 AIU/dia) + Antiespasmòdics urinaris";
   const categories = [geriatria, gastrolesius, aines, renal75, renal18, antiespasmodics]

   const data: any[] = seguretats.map((seguretat: any) => {
      let name: string = '';
      centros.map((centro: { up: any; name: string; }) => {
         if (centro.up == seguretat.up) {
            name = centro.name;
         }
      })

      const geriatria = seguretat['medicacio_potencialment_inapropiada'].punts;
      const gastrolesius = seguretat['medicacio_gastrolesiva_sense_inhibidor_de'].punts;
      const aines = seguretat['cox2_diclofenac_o_aceclofenac_i'].punts;
      const renal75 = seguretat['isra__aine__diuretic'].punts;
      const renal18 = seguretat['o_mes_inhibidors_del_sistema'].punts;
      const antiespasmodics = seguretat['dabsorbents_urinaris_(exclou_cips_amb'].punts;

      const dades = [
         geriatria[geriatria.length - 1],
         gastrolesius[gastrolesius.length - 1],
         aines[aines.length - 1],
         renal75[renal75.length - 1],
         renal18[renal18.length - 1],
         antiespasmodics[antiespasmodics.length - 1],
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

   const seguretats = await getSeguretats({
      any: year,
      up: {
         $in: ups
      }
   });

   const data: any[] = seguretats.map((seguretat: any) => {
      let name: string = '';
      centros.map((centro: { up: any; name: string; }) => {
         if (centro.up == seguretat.up) {
            name = centro.name;
         }
      })

      let dades: any = [];

      for (const [key, value] of (Object.entries(seguretat.indicadors_dhiperprescripcio) as [string, any][])) {
         if (value.puntuacio) {
            dades.push(value.puntuacio[value.puntuacio.length - 1])
         }
      }

      return {
         name: name,
         data: dades,
         total: seguretat.puntuacio_hiperprescripcio
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

   const seguretats = await getSeguretats({
      any: year,
      up: {
         $in: ups
      }
   });

   const data: any[] = seguretats.map((seguretat: any) => {
      let name: string = '';

      centros.map((centro: { up: any; name: string; }) => {
         if (centro.up == seguretat.up) {
            name = centro.name;
         }
      })

      let dades: any = '';
      let numeradors: any = '';
      let denominadors: any = '';

      switch (seccio) {
         case 'biosimilars':
            dades = seguretat['indicadors_universals_(biosimilars)'].biosimilars['%'];
            numeradors = seguretat['indicadors_universals_(biosimilars)'].biosimilars.numerador;
            denominadors = seguretat['indicadors_universals_(biosimilars)'].biosimilars.denominador;
            break;
         default:
            dades = seguretat.indicadors_universals.matma['%'];
            numeradors = seguretat.indicadors_universals.matma.numerador;
            denominadors = seguretat.indicadors_universals.matma.denominador;
            break;
      }
      let primerIndiceNoNulo = dades.findIndex((elemento: null) => elemento !== null);

      const map = dades.map((item: any) => parseFloat((item * 100).toFixed(2)));

      return {
         name: name,
         data: map.slice(primerIndiceNoNulo),
         numeradors: numeradors.slice(primerIndiceNoNulo),
         denominadors: denominadors.slice(primerIndiceNoNulo)
      }
   });
   return data;
}

export const getHiperDetall = async (year: string, centros: any, seccio: any) => {
   const ups: any[] = [];
   centros.map(({ id, name, up }: any) => (
      ups.push(up)
   ))

   const seguretats = await getSeguretats({
      any: year,
      up: {
         $in: ups
      }
   });

   const data: any[] = seguretats.map((seguretat: any) => {
      let name: string = '';

      centros.map((centro: { up: any; name: string; }) => {
         if (centro.up == seguretat.up) {
            name = centro.name;
         }
      })

      const dades = seguretat['indicadors_dhiperprescripcio'][seccio].dhd_st;
      let primerIndiceNoNulo = dades.findIndex((elemento: any) => elemento !== null);

      const map = dades.map((item: any) => {
         if (item) return parseFloat((item).toFixed(2));
      })

      return {
         name: name,
         data: map.slice(primerIndiceNoNulo)
      }
   });

   return data;
}

export const getSeleccioDetall = async (year: string, centros: any, seccio: any) => {
   const ups: any[] = [];
   centros.map(({ id, name, up }: any) => (
      ups.push(up)
   ))

   const seguretats = await getSeguretats({
      any: year,
      up: {
         $in: ups
      }
   });

   const data: any[] = seguretats.map((seguretat: any) => {
      let name: string = '';

      centros.map((centro: { up: any; name: string; }) => {
         if (centro.up == seguretat.up) {
            name = centro.name;
         }
      })

      const dades = seguretat['indicadors_de_seleccio_de_medicaments'][seccio]['%'];
      const numeradors = seguretat['indicadors_de_seleccio_de_medicaments'][seccio].numerador;
      const denominadors = seguretat['indicadors_de_seleccio_de_medicaments'][seccio].denominador;
      let primerIndiceNoNulo = dades.findIndex((elemento: null) => elemento !== null);

      const mapDades = dades.map((item: any) => parseFloat((item * 100).toFixed(2)));

      return {
         name: name,
         data: mapDades.slice(primerIndiceNoNulo),
         numeradors: numeradors.slice(primerIndiceNoNulo),
         denominadors: denominadors.slice(primerIndiceNoNulo)
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
            width: 2,
            value: 0.71,
            label: {
               text: '10p'
            }
         }, {
            color: 'var(--yellow)',
            width: 2,
            value: 0.81,
            label: {
               text: '8p'
            }
         }, {
            color: 'var(--orange)',
            width: 2,
            value: 0.94,
            label: {
               text: '6p'
            }
         }, {
            color: 'var(--orange-1)',
            width: 2,
            value: 1.04,
            label: {
               text: '4p'
            }
         }, {
            color: 'var(--red)',
            width: 2,
            value: 1.30,
            label: {
               text: '2p'
            }
         }]
         break;

      case 'biosimilars':
         plotlines = [{
            color: 'var(--green)',
            width: 2,
            value: 32,
            label: {
               text: '5p'
            }
         }, {
            color: 'var(--yellow)',
            width: 2,
            value: 24,
            label: {
               text: '3p'
            }
         }, {
            color: 'var(--red)',
            width: 2,
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
            width: 2,
            value: 22.3,
            label: {
               text: '6p'
            }
         }, {
            color: 'var(--yellow)',
            width: 2,
            value: 26.7,
            label: {
               text: '4p'
            }
         }, {
            color: 'var(--orange)',
            width: 2,
            value: 30,
            label: {
               text: '3p'
            }
         }, {
            color: 'var(--orange-1)',
            width: 2,
            value: 33.7,
            label: {
               text: '2p'
            }
         }, {
            color: 'var(--red)',
            width: 2,
            value: 37.5,
            label: {
               text: '1p'
            }
         }]
         break;

      case 'antiulcerosos':
         plotlines = [{
            color: 'var(--green)',
            width: 2,
            value: 96.1,
            label: {
               text: '9p'
            }
         }, {
            color: 'var(--yellow)',
            width: 2,
            value: 103.9,
            label: {
               text: '7p'
            }
         }, {
            color: 'var(--orange)',
            width: 2,
            value: 112.9,
            label: {
               text: '5p'
            }
         }, {
            color: 'var(--orange-1)',
            width: 2,
            value: 119.9,
            label: {
               text: '3p'
            }
         }, {
            color: 'var(--red)',
            width: 2,
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
            width: 2,
            value: 1,
            label: {
               text: '2p'
            }
         }, {
            color: 'var(--red)',
            width: 2,
            value: 1.6,
            label: {
               text: '1p'
            }
         }]
         break;

      case 'benzodiazepines':
         plotlines = [{
            color: 'var(--green)',
            width: 2,
            value: 56.2,
            label: {
               text: '7p'
            }
         }, {
            color: 'var(--yellow)',
            width: 2,
            value: 63.4,
            label: {
               text: '5p'
            }
         }, {
            color: 'var(--orange)',
            width: 2,
            value: 68.8,
            label: {
               text: '3p'
            }
         }, {
            color: 'var(--orange-1)',
            width: 2,
            value: 77.1,
            label: {
               text: '2p'
            }
         }, {
            color: 'var(--red)',
            width: 2,
            value: 86.1,
            label: {
               text: '1p'
            }
         }]
         break;

      case 'antiespasmodics':
         plotlines = [{
            color: 'var(--green)',
            width: 2,
            value: 5.8,
            label: {
               text: '6p'
            }
         }, {
            color: 'var(--yellow)',
            width: 2,
            value: 6.7,
            label: {
               text: '4p'
            }
         }, {
            color: 'var(--orange)',
            width: 2,
            value: 7.4,
            label: {
               text: '3p'
            }
         }, {
            color: 'var(--orange-1)',
            width: 2,
            value: 8.2,
            label: {
               text: '2p'
            }
         }, {
            color: 'var(--red)',
            width: 2,
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
            width: 2,
            value: 5.8,
            label: {
               text: '10p'
            }
         }, {
            color: 'var(--yellow)',
            width: 2,
            value: 6.8,
            label: {
               text: '8p'
            }
         }, {
            color: 'var(--orange)',
            width: 2,
            value: 7.7,
            label: {
               text: '6p'
            }
         }, {
            color: 'var(--orange-1)',
            width: 2,
            value: 8.6,
            label: {
               text: '4p'
            }
         }, {
            color: 'var(--red)',
            width: 2,
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
            width: 2,
            value: 71,
            label: {
               text: '6p'
            }
         }, {
            color: 'var(--yellow)',
            width: 2,
            value: 70,
            label: {
               text: '5p'
            }
         }, {
            color: 'var(--orange)',
            width: 2,
            value: 68,
            label: {
               text: '3p'
            }
         }, {
            color: 'var(--orange-1)',
            width: 2,
            value: 66,
            label: {
               text: '2p'
            }
         }, {
            color: 'var(--red)',
            width: 2,
            value: 64,
            label: {
               text: '1p'
            }
         }]
         break;

      case 'ibp':
         plotlines = [{
            color: 'var(--green)',
            width: 2,
            value: 90,
            label: {
               text: '6p'
            }
         }, {
            color: 'var(--yellow)',
            width: 2,
            value: 89,
            label: {
               text: '4p'
            }
         }, {
            color: 'var(--red)',
            width: 2,
            value: 87,
            label: {
               text: '2p'
            }
         }]
         break;

      case 'osteoporosi':
         plotlines = [{
            color: 'var(--green)',
            width: 2,
            value: 64,
            label: {
               text: '5p'
            }
         }, {
            color: 'var(--yellow)',
            width: 2,
            value: 61,
            label: {
               text: '4p'
            }
         }, {
            color: 'var(--orange)',
            width: 2,
            value: 58,
            label: {
               text: '3p'
            }
         }, {
            color: 'var(--orange-1)',
            width: 2,
            value: 53,
            label: {
               text: '2p'
            }
         }, {
            color: 'var(--red)',
            width: 2,
            value: 48,
            label: {
               text: '1p'
            }
         }]
         break;

      case 'hipocolesterolemiants':
         plotlines = [{
            color: 'var(--green)',
            width: 2,
            value: 80,
            label: {
               text: '6p'
            }
         }, {
            color: 'var(--yellow)',
            width: 2,
            value: 78,
            label: {
               text: '5p'
            }
         }, {
            color: 'var(--orange)',
            width: 2,
            value: 75,
            label: {
               text: '3p'
            }
         }, {
            color: 'var(--red)',
            width: 2,
            value: 73,
            label: {
               text: '1p'
            }
         }]
         break;

      case 'antidepressius_1a_linia':
         plotlines = [{
            color: 'var(--green)',
            width: 2,
            value: 66,
            label: {
               text: '6p'
            }
         }, {
            color: 'var(--yellow)',
            width: 2,
            value: 65,
            label: {
               text: '5p'
            }
         }, {
            color: 'var(--orange)',
            width: 2,
            value: 63,
            label: {
               text: '4p'
            }
         }, {
            color: 'var(--orange-1)',
            width: 2,
            value: 62,
            label: {
               text: '3p'
            }
         }, {
            color: 'var(--red)',
            width: 2,
            value: 59,
            label: {
               text: '1p'
            }
         }]
         break;

      case 'antidepressius_2a_linia':
         plotlines = [{
            color: 'var(--green)',
            width: 2,
            value: 41,
            label: {
               text: '2p'
            }
         }, {
            color: 'var(--red)',
            width: 2,
            value: 36,
            label: {
               text: '1p'
            }
         }]
         break;

      case 'hipoglucemiants_monoterapia_recomanada':
         plotlines = [{
            color: 'var(--green)',
            width: 2,
            value: 77,
            label: {
               text: '4p'
            }
         }, {
            color: 'var(--yellow)',
            width: 2,
            value: 75,
            label: {
               text: '3p'
            }
         }, {
            color: 'var(--red)',
            width: 2,
            value: 74,
            label: {
               text: '2p'
            }
         }]
         break;

      case 'hipoglucemiants_biterapia_recomanada':
         plotlines = [{
            color: 'var(--green)',
            width: 2,
            value: 46,
            label: {
               text: '4p'
            }
         }, {
            color: 'var(--yellow)',
            width: 2,
            value: 41,
            label: {
               text: '3p'
            }
         }, {
            color: 'var(--red)',
            width: 2,
            value: 39,
            label: {
               text: '2p'
            }
         }]
         break;

      case 'mpoc_seleccio':
         plotlines = [{
            color: 'var(--green)',
            width: 2,
            value: 37,
            label: {
               text: '7p'
            }
         }, {
            color: 'var(--yellow)',
            width: 2,
            value: 35,
            label: {
               text: '5p'
            }
         }, {
            color: 'var(--orange)',
            width: 2,
            value: 32,
            label: {
               text: '3p'
            }
         }, {
            color: 'var(--orange-1)',
            width: 2,
            value: 30,
            label: {
               text: '2p'
            }
         }, {
            color: 'var(--red)',
            width: 2,
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