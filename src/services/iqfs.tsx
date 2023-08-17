import _ from "lodash"
import { getSession } from "@/services/session"
import userIface, { UserIface } from "@/schemas/user";
import { hash } from 'bcryptjs';

export const getIqfs = async () => {
   return fetch('http://localhost:3000/api/iqfs',
      {
         method: 'POST'
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
   console.log(iqf);
   const data = [{
      name: 'universal',
      data: iqf.puntuacio_universals
   }, {
      name: 'selecció',
      data: iqf.puntuacio_seleccio
   }, {
      name: 'hiperprescripció',
      data: iqf.puntuacio_hiperprescripcio
   }
   ]
   return data;
}

export const getBasal = async (up: string) => {
   const iqf = await getIqf(up);
   return iqf.basal;
}