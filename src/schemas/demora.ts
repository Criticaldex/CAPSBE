import mongoose from 'mongoose'

interface ProfessionalData {
   minim: number;
   maxim: number;
   mediana: number;
}

interface Professionals {
   [name: string]: ProfessionalData;
}

export interface DemoraIface {
   dia: string;
   mes: string;
   any: string;
   sector: string;
   professionals: Professionals;
   centre: string;
}

const ProfessionalDataSchema = new mongoose.Schema({
   minim: { type: Number, required: true },
   maxim: { type: Number, required: true },
   mediana: { type: Number, required: true },
});

const ProfessionalsSchema = new mongoose.Schema({
   // Dynamic key-value pairs with ProfessionalDataSchema
}, { _id: false });

const Schema = new mongoose.Schema({
   dia: { type: String, required: true },
   mes: { type: String, required: true },
   any: { type: String, required: true },
   sector: { type: String, required: true },
   professionals: ProfessionalsSchema,
   centre: { type: String, required: true },
});

export default Schema