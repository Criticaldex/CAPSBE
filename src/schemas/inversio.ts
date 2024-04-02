import mongoose from 'mongoose'

export interface InversioIface {
   control_def: string,
   element_dinversio: string,
   u: number,
   p_u: number,
   t: number,
   unitats_definitives: number,
   preu_u_definitiu: number,
   total: number,
   diferencia: number,
   classificacio: string,
   centre: string,
   contractacio: string,
   previsio_execucio: Date,
   estat: string,
   data_compra: Date,
   data_entrega: Date,
   data_factura: Date,
   n_factura: string,
   proveidor: string,
   any: string
}

const Schema = new mongoose.Schema({
   control_def: {
      type: String,
   },
   element_dinversio: {
      type: String,
   },
   u: {
      type: Number,
   },
   p_u: {
      type: Number,
   },
   t: {
      type: Number,
   },
   unitats_definitives: {
      type: Number,
   },
   preu_u_definitiu: {
      type: Number,
   },
   total: {
      type: Number,
   },
   diferencia: {
      type: Number,
   },
   classificacio: {
      type: String,
   },
   centre: {
      type: String,
   },
   contractacio: {
      type: String,
   },
   previsio_execucio: {
      type: Date,
   },
   estat: {
      type: String,
   },
   data_compra: {
      type: Date,
   },
   data_entrega: {
      type: Date,
   },
   data_factura: {
      type: Date,
   },
   n_factura: {
      type: String,
   },
   proveidor: {
      type: String,
   },
   any: {
      type: String,
   },
});

export default Schema