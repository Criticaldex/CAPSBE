import mongoose from 'mongoose'

const Schema = new mongoose.Schema({});

export default mongoose.models.profesional || mongoose.model('profesional', Schema)