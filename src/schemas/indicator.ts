import mongoose from 'mongoose'

export interface IndicatorIface {
   identificador: string,
   indicador: string,
   codi: string,
   any: string,
   centre?: string,
   grup?: string,
   invers: boolean,
   objectiu: any,
   ordre?: any,
   dbName: string,
   objectius: any,
   configs?: object
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
   objectiu: {
      type: Number
   },
   invers: {
      type: Boolean
   },
});

export default Schema