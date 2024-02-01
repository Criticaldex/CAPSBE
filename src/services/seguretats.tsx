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
               sort: '-up'
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
      const dades = seguretat.total_punts

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
   centros.map(({ id, name, up }: any) => (
      ups.push(up)
   ))

   const seguretats = await getSeguretats({
      any: year,
      up: {
         $in: ups
      }
   });

   const geriatria = 'Pac 75 medicaments inapropiats';
   const gastrolesius = 'Pac 75 F gastrol. i no IBP';
   const aines = "Pac 18 AINES CV + Patologia CV";
   const renal75 = "Pac 75 AINES + ISRA + Diüretics";
   const renal18 = "Pac 18 >=2 inh. Sist Ren-Angiotens";
   const antiespasmodics = "Pac 18 AIU + antiespam. urinaris";
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
         total: dades.reduce((accumulator, currentValue, index) => {
            return accumulator + currentValue;
         })
      }
   });

   return {
      categories,
      data
   };
}

export const getSnc = async (year: string, centros: any) => {
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

   const antipsicotics75 = "Pac 75 >=2 antipsicòtics";
   const antipsicotics18 = "Pac 18 antipsicòtics + F demència";
   const anticolinergics75 = "Pac 75 >=3 F anticolinèrgics";
   const anticolUrin = "anticol. urin. +F demència colinèrgics";
   const opiodesFD = "Pac 18 Opiodes Forts + debils";
   const opiodesFB = "Pac 18 Opiodes Forts + Benzos";
   const opiodesFG = "Pac 18 Forts + Gaba o Pregabalina";
   const benzos2 = "Pac 18 amb 2 Benzos";
   const benzos3 = "Pac 18 amb >=3 Benzos";
   const farmacsSNC = "Pac 75 amb >=4 Fàrmacs SNC";
   const categories = [antipsicotics75, antipsicotics18, anticolinergics75, anticolUrin, opiodesFD, opiodesFB, opiodesFG, benzos2, benzos3, farmacsSNC]

   const data: any[] = seguretats.map((seguretat: any) => {
      let name: string = '';
      centros.map((centro: { up: any; name: string; }) => {
         if (centro.up == seguretat.up) {
            name = centro.name;
         }
      })

      const antipsicotics75 = seguretat['dos_o_mes_antipsicotics_(exclou'].punts;
      const antipsicotics18 = seguretat['tractament_per_la_demencia_i'].punts;
      const anticolinergics75 = seguretat['tres_o_mes_medicaments_amb'].punts;
      const anticolUrin = seguretat['anticolinergics_urinaris_i_farmacs_per'].punts;
      const opiodesFD = seguretat['concomitant_dopioides_forts_i_opioides'].punts;
      const opiodesFB = seguretat['concomitant_dopioides_forts_i_benzodiazepines'].punts;
      const opiodesFG = seguretat['concomitant_dopioides_forts_i_gabapentina'].punts;
      const benzos2 = seguretat['benzodiazepines_o_farmacs_relacionats_diferents'].punts;
      const benzos3 = seguretat['tres_o_mes_benzodiazepines_o'].punts;
      const farmacsSNC = seguretat['quatre_o_mes_farmacs_depressors'].punts;

      const dades = [
         antipsicotics75[antipsicotics75.length - 1],
         antipsicotics18[antipsicotics18.length - 1],
         anticolinergics75[anticolinergics75.length - 1],
         anticolUrin[anticolUrin.length - 1],
         opiodesFD[opiodesFD.length - 1],
         opiodesFB[opiodesFB.length - 1],
         opiodesFG[opiodesFG.length - 1],
         benzos2[benzos2.length - 1],
         benzos3[benzos3.length - 1],
         farmacsSNC[farmacsSNC.length - 1],
      ]

      return {
         name: name,
         data: dades,
         total: dades.reduce((accumulator, currentValue, index) => {
            return accumulator + currentValue;
         })
      }
   });

   return {
      categories,
      data
   };
}

export const getGeriatriaDetall = async (year: string, centros: any, seccio: any) => {
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

      const pacients75 = seguretat['pacients_>=75a_us_cronic_(especialitats)'];
      const pacients18 = seguretat['pacients_>=18a_us_cronic_(especialitats)'];

      switch (seccio) {
         case "Pac 75 F gastrol. i no IBP":
            dades = seguretat['medicacio_gastrolesiva_sense_inhibidor_de'].taxa;
            numeradors = seguretat['medicacio_gastrolesiva_sense_inhibidor_de'].pacients;
            denominadors = pacients75;
            break;
         case "Pac 18 AINES CV + Patologia CV":
            dades = seguretat['cox2_diclofenac_o_aceclofenac_i'].taxa;
            numeradors = seguretat['cox2_diclofenac_o_aceclofenac_i'].pacients;
            denominadors = pacients18;
            break;
         case "Pac 75 AINES + ISRA + Diüretics":
            dades = seguretat['isra__aine__diuretic'].taxa;
            numeradors = seguretat['isra__aine__diuretic'].pacients;
            denominadors = pacients75;
            break;
         case "Pac 18 >=2 inh. Sist Ren-Angiotens":
            dades = seguretat['o_mes_inhibidors_del_sistema'].taxa;
            numeradors = seguretat['o_mes_inhibidors_del_sistema'].pacients;
            denominadors = pacients18;
            break;
         case "Pac 18 AIU + antiespam. urinaris":
            dades = seguretat['dabsorbents_urinaris_(exclou_cips_amb'].taxa;
            numeradors = seguretat['dabsorbents_urinaris_(exclou_cips_amb'].pacients;
            denominadors = pacients18;
            break;
         default:
            dades = seguretat['medicacio_potencialment_inapropiada'].taxa;
            numeradors = seguretat['medicacio_potencialment_inapropiada'].pacients;
            denominadors = pacients75;
            break;
      }
      let primerIndiceNoNulo = dades.findIndex((elemento: null) => elemento !== null);

      return {
         name: name,
         data: dades.slice(primerIndiceNoNulo),
         numeradors: numeradors.slice(primerIndiceNoNulo),
         denominadors: denominadors.slice(primerIndiceNoNulo)
      }
   });
   return data;
}

export const getSncDetall = async (year: string, centros: any, seccio: any) => {
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

      const pacients75 = seguretat['pacients_>=75a_us_cronic_(especialitats)'];
      const pacients18 = seguretat['pacients_>=18a_us_cronic_(especialitats)'];

      switch (seccio) {
         case "Pac 18 antipsicòtics + F demència":
            dades = seguretat['tractament_per_la_demencia_i'].taxa;
            numeradors = seguretat['tractament_per_la_demencia_i'].pacients;
            denominadors = pacients18;
            break;
         case "Pac 75 >=3 F anticolinèrgics":
            dades = seguretat['tres_o_mes_medicaments_amb'].taxa;
            numeradors = seguretat['tres_o_mes_medicaments_amb'].pacients;
            denominadors = pacients75;
            break;
         case "anticol. urin. +F demència colinèrgics":
            dades = seguretat['anticolinergics_urinaris_i_farmacs_per'].taxa;
            numeradors = seguretat['anticolinergics_urinaris_i_farmacs_per'].pacients;
            denominadors = pacients18;
            break;
         case "Pac 18 Opiodes Forts + debils":
            dades = seguretat['concomitant_dopioides_forts_i_opioides'].taxa;
            numeradors = seguretat['concomitant_dopioides_forts_i_opioides'].pacients;
            denominadors = pacients18;
            break;
         case "Pac 18 Opiodes Forts + Benzos":
            dades = seguretat['concomitant_dopioides_forts_i_benzodiazepines'].taxa;
            numeradors = seguretat['concomitant_dopioides_forts_i_benzodiazepines'].pacients;
            denominadors = pacients18;
            break;
         case "Pac 18 Forts + Gaba o Pregabalina":
            dades = seguretat['concomitant_dopioides_forts_i_gabapentina'].taxa;
            numeradors = seguretat['concomitant_dopioides_forts_i_gabapentina'].pacients;
            denominadors = pacients18;
            break;
         case "Pac 18 amb 2 Benzos":
            dades = seguretat['benzodiazepines_o_farmacs_relacionats_diferents'].taxa;
            numeradors = seguretat['benzodiazepines_o_farmacs_relacionats_diferents'].pacients;
            denominadors = pacients18;
            break;
         case "Pac 18 amb >=3 Benzos":
            dades = seguretat['tres_o_mes_benzodiazepines_o'].taxa;
            numeradors = seguretat['tres_o_mes_benzodiazepines_o'].pacients;
            denominadors = pacients18;
            break;
         case "Pac 75 amb >=4 Fàrmacs SNC":
            dades = seguretat['quatre_o_mes_farmacs_depressors'].taxa;
            numeradors = seguretat['quatre_o_mes_farmacs_depressors'].pacients;
            denominadors = pacients75;
            break;
         default:
            dades = seguretat['dos_o_mes_antipsicotics_(exclou'].taxa;
            numeradors = seguretat['dos_o_mes_antipsicotics_(exclou'].pacients;
            denominadors = pacients75;
            break;
      }
      let primerIndiceNoNulo = dades.findIndex((elemento: null) => elemento !== null);

      return {
         name: name,
         data: dades.slice(primerIndiceNoNulo),
         numeradors: numeradors.slice(primerIndiceNoNulo),
         denominadors: denominadors.slice(primerIndiceNoNulo)
      }
   });
   return data;
}

export const getPlotLines = async (seccio: any) => {
   let plotlines: any = '';

   switch (seccio) {
      //Geriatria
      case "Pac 75 medicaments inapropiats":
         plotlines = [{
            color: 'var(--green)',
            width: 2,
            value: 159.19,
            label: {
               text: '8p'
            }
         }, {
            color: 'var(--yellow)',
            width: 2,
            value: 168.75,
            label: {
               text: '5p'
            }
         }, {
            color: 'var(--red)',
            width: 2,
            value: 189.18,
            label: {
               text: '3p'
            }
         }]
         break;
      case "Pac 75 F gastrol. i no IBP":
         plotlines = [{
            color: 'var(--green)',
            width: 2,
            value: 2.81,
            label: {
               text: '6p'
            }
         }, {
            color: 'var(--yellow)',
            width: 2,
            value: 3.97,
            label: {
               text: '4p'
            }
         }, {
            color: 'var(--red)',
            width: 2,
            value: 4.45,
            label: {
               text: '2p'
            }
         }]
         break;
      case "Pac 18 AINES CV + Patologia CV":
         plotlines = [{
            color: 'var(--red)',
            width: 2,
            value: 0.13,
            label: {
               text: '2p'
            }
         }]
         break;
      case "Pac 75 AINES + ISRA + Diüretics":
         plotlines = [{
            color: 'var(--green)',
            width: 2,
            value: 6.70,
            label: {
               text: '8p'
            }
         }, {
            color: 'var(--yellow)',
            width: 2,
            value: 8.02,
            label: {
               text: '5p'
            }
         }, {
            color: 'var(--red)',
            width: 2,
            value: 10.24,
            label: {
               text: '3p'
            }
         }]
         break;
      case "Pac 18 >=2 inh. Sist Ren-Angiotens":
         plotlines = [{
            color: 'var(--green)',
            width: 2,
            value: 0.28,
            label: {
               text: '6p'
            }
         }, {
            color: 'var(--yellow)',
            width: 2,
            value: 0.35,
            label: {
               text: '4p'
            }
         }, {
            color: 'var(--red)',
            width: 2,
            value: 0.53,
            label: {
               text: '2p'
            }
         }]
         break;
      case "Pac 18 AIU + antiespam. urinaris":
         plotlines = [{
            color: 'var(--green)',
            width: 2,
            value: 2.02,
            label: {
               text: '8p'
            }
         }, {
            color: 'var(--yellow)',
            width: 2,
            value: 2.65,
            label: {
               text: '5p'
            }
         }, {
            color: 'var(--red)',
            width: 2,
            value: 3.02,
            label: {
               text: '3p'
            }
         }]
         break;

      //Snc
      case 'Pac 75 >=2 antipsicòtics':
         plotlines = [{
            color: 'var(--green)',
            width: 2,
            value: 6.13,
            label: {
               text: '8p'
            }
         }, {
            color: 'var(--yellow)',
            width: 2,
            value: 7.31,
            label: {
               text: '5p'
            }
         }, {
            color: 'var(--red)',
            width: 2,
            value: 8.64,
            label: {
               text: '3p'
            }
         }]
         break;
      case 'Pac 18 antipsicòtics + F demència':
         plotlines = [{
            color: 'var(--green)',
            width: 2,
            value: 2.75,
            label: {
               text: '4p'
            }
         }, {
            color: 'var(--yellow)',
            width: 2,
            value: 3.44,
            label: {
               text: '2p'
            }
         }, {
            color: 'var(--red)',
            width: 2,
            value: 4.14,
            label: {
               text: '1p'
            }
         }]
         break;
      case 'Pac 75 >=3 F anticolinèrgics':
         plotlines = [{
            color: 'var(--green)',
            width: 2,
            value: 19.94,
            label: {
               text: '8p'
            }
         }, {
            color: 'var(--yellow)',
            width: 2,
            value: 21.29,
            label: {
               text: '5p'
            }
         }, {
            color: 'var(--red)',
            width: 2,
            value: 25.20,
            label: {
               text: '3p'
            }
         }]
         break;
      case 'anticol. urin. +F demència colinèrgics':
         plotlines = [{
            color: 'var(--green)',
            width: 2,
            value: 0.12,
            label: {
               text: '8p'
            }
         }, {
            color: 'var(--yellow)',
            width: 2,
            value: 0.21,
            label: {
               text: '5p'
            }
         }, {
            color: 'var(--red)',
            width: 2,
            value: 0.33,
            label: {
               text: '3p'
            }
         }]
         break;
      case 'Pac 18 Opiodes Forts + debils':
         plotlines = [{
            color: 'var(--green)',
            width: 2,
            value: 1.03,
            label: {
               text: '8p'
            }
         }, {
            color: 'var(--yellow)',
            width: 2,
            value: 1.17,
            label: {
               text: '5p'
            }
         }, {
            color: 'var(--red)',
            width: 2,
            value: 1.46,
            label: {
               text: '3p'
            }
         }]
         break;
      case 'Pac 18 Opiodes Forts + Benzos':
         plotlines = [{
            color: 'var(--green)',
            width: 2,
            value: 5.41,
            label: {
               text: '5p'
            }
         }, {
            color: 'var(--yellow)',
            width: 2,
            value: 6.56,
            label: {
               text: '3p'
            }
         }, {
            color: 'var(--red)',
            width: 2,
            value: 8.09,
            label: {
               text: '1p'
            }
         }]
         break;
      case 'Pac 18 Forts + Gaba o Pregabalina':
         plotlines = [{
            color: 'var(--green)',
            width: 2,
            value: 3.35,
            label: {
               text: '5p'
            }
         }, {
            color: 'var(--yellow)',
            width: 2,
            value: 3.98,
            label: {
               text: '3p'
            }
         }, {
            color: 'var(--red)',
            width: 2,
            value: 4.93,
            label: {
               text: '1p'
            }
         }]
         break;
      case 'Pac 18 amb 2 Benzos':
         plotlines = [{
            color: 'var(--red)',
            width: 2,
            value: 22.30,
            label: {
               text: '2p'
            }
         }]
         break;
      case 'Pac 18 amb >=3 Benzos':
         plotlines = [{
            color: 'var(--green)',
            width: 2,
            value: 0.93,
            label: {
               text: '6p'
            }
         }, {
            color: 'var(--yellow)',
            width: 2,
            value: 1.17,
            label: {
               text: '4p'
            }
         }, {
            color: 'var(--red)',
            width: 2,
            value: 1.47,
            label: {
               text: '2p'
            }
         }]
         break;
      case 'Pac 75 amb >=4 Fàrmacs SNC':
         //Antibiotics al pdf
         plotlines = [{
            color: 'var(--green)',
            width: 2,
            value: 28.12,
            label: {
               text: '8p'
            }
         }, {
            color: 'var(--yellow)',
            width: 2,
            value: 31.15,
            label: {
               text: '5p'
            }
         }, {
            color: 'var(--red)',
            width: 2,
            value: 33.70,
            label: {
               text: '3p'
            }
         }]
         break;
      default:
         plotlines = [];
         break;
   }
   return plotlines;
}