import mongoose from 'mongoose'

export interface AccessibilitatIface {
   identificador: string;
   codi: string;
   indicador: string;
   resultat: number[];
   sector: string;
   acumulat: boolean;
   any: string;
   centre: string;
}

const Schema = new mongoose.Schema({
   identificador: {
      type: String,
      required: true
   },
   codi: {
      type: String,
      required: true
   },
   indicador: {
      type: String,
      required: true
   },
   resultat: {
      type: [Number],
      required: true
   },
   sector: {
      type: String,
      required: true
   },
   acumulat: {
      type: Boolean,
      required: true
   },
   any: {
      type: String,
      required: true
   },
   centre: {
      type: String,
      required: true
   }
})

export default Schema