import mongoose from 'mongoose'

export interface OrdresIface {
   identificador: string,
   indicador: string,
   resultat: Array<number>,
   any: string,
   centre?: string,
}

const Schema = new mongoose.Schema({
   identificador: {
      type: String,
      required: [true, 'L\'identificador es obligatori!']
   },
   any: {
      type: String,
      required: [true, 'L\'Any es obligatori!']
   },
   centre: {
      type: String,
      required: [true, 'El Centre es obligatori!']
   },
   indicador: {
      type: String,
      required: [true, 'L\'indicador es obligatori!']
   },
   resultat: {
      type: Array,
      required: [true, 'El Resultat es obligatori']
   }
});

export default Schema