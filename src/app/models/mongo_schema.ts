import mongoose from "mongoose";


const Schema = mongoose.Schema;
let SchemaGeneral = new Schema({}, {strict: false})
export const eapsvu = mongoose.model('EAPSVU', SchemaGeneral,'eapsVU');